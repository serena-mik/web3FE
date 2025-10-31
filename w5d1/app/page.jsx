'use client'
import { useState } from 'react'
import { createWalletClient, createPublicClient, custom, http, parseEther, formatEther } from 'viem'
import { sepolia } from 'viem/chains'
import erc20abi from "../lib/abi";
import 'dotenv/config'

const tokenAddress = '0xa7d726B7F1085F943056C2fB91abE0204eC6d6DA'
const RPC_URL = process.env.RPC_URL

export default function Page() {
  const [account, setAccount] = useState(null)
  const [walletClient, setWalletClient] = useState(null)
  const [publicClient, setPublicClient] = useState(null)
  const [info, setInfo] = useState({})
  const [balance, setBalance] = useState(null)
  const [loading, setLoading] = useState(false)
  const [token4EachAddr, setToken4EachAddr] = useState(new Map())

  // 🧩 连接钱包
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('请安装 MetaMask 钱包')
      return
    }

    const [my_address] = await window.ethereum.request({ method: 'eth_requestAccounts'})

    const wallet = createWalletClient({ chain: sepolia, transport: custom(window.ethereum)})

    const pub = createPublicClient({
      chain: sepolia,
      transport: http(RPC_URL),
    })

    setWalletClient(wallet)
    setPublicClient(pub)
    setAccount(my_address)
  }

  //  读取 ERC20 基本信息
  const readERC20Info = async () => {
    if (!publicClient) return alert('请先连接钱包')
    setLoading(true)
    try {
      const [owner, maxMint, totalSupply] = await Promise.all([
        publicClient.readContract({
          address: tokenAddress,
          abi: erc20abi,
          functionName: 'owner',
        }),
        publicClient.readContract({
          address: tokenAddress,
          abi: erc20abi,
          functionName: 'MAX_MINT_PER_ADDRESS',
        }),
        publicClient.readContract({
          address: tokenAddress,
          abi: erc20abi,
          functionName: 'totalSupply',
        }),
      ])

      setInfo({
        owner,
        maxMint: Number(maxMint),
        totalSupply: Number(totalSupply),
      })
    } catch (err) {
      alert('读取失败: ' + err.message)
    }
    setLoading(false)
  }

  //获取所有的持币地址
  async function getAllTokenHolders() {
    // 1️ 读取所有 Transfer 事件日志
    const logs = await publicClient.getLogs({
      address: tokenAddress,
      event: {
        name: "Transfer",
        type: "event",
        inputs: [
          { name: "from", type: "address", indexed: true },
          { name: "to", type: "address", indexed: true },
          { name: "value", type: "uint256", indexed: false },
        ],
      },
      fromBlock: 0n, // 从合约部署区块开始
      toBlock: "latest",
    });
  
    // 2️ 提取所有参与过的地址
    const holders = new Set();
    for (const log of logs) {
      if (log.args.from) {
        holders.add(log.args.from);
      }
      if (log.args.to) {
        holders.add(log.args.to);
      }
    };
    holders.delete("0x0000000000000000000000000000000000000000"); // 移除零地址
  // 3️ 查询每个地址的余额
    // const results = await Promise.all(
    //   [...holders].map(async (addr) => {
    //     const r = await publicClient.readContract({
    //       address: tokenAddress,
    //       abi: erc20abi,
    //       functionName: 'balanceOf',
    //       args: [addr]
    //     });
    //     return { address: addr, tokenNo: formatEther(r) };
    //   })
    // )

    const tempM = new Map();
    for (const addr of holders) {
      try {
        const bls = await publicClient.readContract({
          address: tokenAddress,
          abi: erc20abi,
          functionName: 'balanceOf',
          args: [addr],
        })
        tempM.set(addr, formatEther(bls)) // 格式化成 ETH 单位
      } catch (err) {
        console.error(`查询 ${addr} 失败:`, err)
      }

      // 防止 Infura 限速，稍微延迟
      await new Promise(r => setTimeout(r, 300))
    }

    // 4️ 过滤出余额大于0的地址
    //const nonZeroHolders = tempM.filter(r => Number(r.tokenNo )> 0);
    setToken4EachAddr(tempM)
    console.log("实际持币地址:", token4EachAddr);
  }

  //切换到Sepolia网络
  const switchToSepolia = async () => {
    if (!window.ethereum) return alert("请安装 MetaMask")
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }], // 11155111 十六进制 = 0xaa36a7
      })
      alert("已切换到 Sepolia 网络")
    } catch (switchError) {
      // 如果用户钱包里没有 Sepolia，需要添加
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Sepolia Test Network",
                rpcUrls: [RPC_URL],
                nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
                blockExplorerUrls: ["https://sepolia.etherscan.io"],
              },
            ],
          })
        } catch (addError) {
          console.error("添加网络失败", addError)
        }
      } else {
        console.error("切换网络失败", switchError)
      }
    }
  }
  
// Mint 代币
  const mintToken = async () => {
    if (!walletClient) return alert('请先连接钱包')
    try {
      setLoading(true)
      const hash = await walletClient.writeContract({
        address: tokenAddress,
        abi: erc20abi,
        functionName: 'mint',
        args: [parseEther('10000')],// mint 10000 枚
      })
      alert('Mint 交易已发出,TxHash: ' + hash)
    } catch (err) {
      alert('Mint 失败: ' + err.message)
    }
    setLoading(false)
  }

  //  查询账户余额
  const checkBalance = async () => {
    if (!publicClient || !account) return alert('请先连接钱包')
    setLoading(true)
    try {
      const result = await publicClient.readContract({
        address: tokenAddress,
        abi: erc20abi,
        functionName: 'balanceOf',
        args: [account],
      })
      setBalance(Number(result))
    } catch (err) {
      alert('查询'+ account + '的余额失败: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="p-8 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">ERC20 Token 控制面板</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          连接钱包
        </button>
      ) : (
        <div>
          <p className="mb-2">✅ 钱包地址: {account}</p>

          <div className="space-x-2 mb-4">
            <button
              onClick={readERC20Info}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              读取合约信息
            </button>
              {info.owner && (
              <div className="mt-4 border p-4 rounded-lg bg-gray-50">
              <h2 className="font-semibold mb-2">📘 ERC20 合约信息</h2>
              <p>Owner: {info.owner}</p>
              <p>每个地址最大持币: {info.maxMint}</p>
              <p>总发行量: {info.totalSupply}</p>
            </div>
          )}

            <button
              onClick={getAllTokenHolders}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              每个地址持币数量
            </button>
            <div className="mt-6">
                {[...token4EachAddr.entries()].length === 0 && !loading && (
                  <p>暂无数据，请点击按钮查询</p>
                )}

                {[...token4EachAddr.entries()].map(([address, amount]) => (
                  <div key={address} className="border-b py-2">
                    <span className="font-mono">{address}</span> — {amount} Tokens
                  </div>
                ))}
            </div>
            {/* <button
              onClick={switchToSepolia}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              切换到Sepolia
            </button> */}
            <button
              onClick={mintToken}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Mint 10000 Token
            </button>
            <button
              onClick={checkBalance}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              查询余额
            </button>
          </div>

          {loading && <p>⏳ 正在执行中...</p>}

          {balance !== null && (
            <div className="mt-4 border p-4 rounded-lg bg-green-50">
              <h2 className="font-semibold mb-2">💰 我的余额</h2>
              <p>{balance} Token</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
