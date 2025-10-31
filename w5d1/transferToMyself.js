import { createWalletClient, http, parseEther } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import 'dotenv/config'

const account = mnemonicToAccount(process.env.MY_WORDs)

const client = createWalletClient({
  account,
  chain: sepolia,
  transport: http(),
})

// 发送 0.01 ETH 给自己
const txHash = await client.sendTransaction({
  account,
  to: "0x38CA4Fe15f55118B4403a3BB77be944592A9e37F",
  value: parseEther('0.01'),
})

console.log('转账成功，交易哈希：', txHash)
