
import rsa
import hashlib
import itertools

def generate_keys():
    pub_key, priv_key = rsa.newkeys(2048)
    with open('public.pem', 'wb') as f:
        f.write(pub_key.save_pkcs1())
    with open('private.pem', 'wb') as f:
        f.write(priv_key.save_pkcs1())
    return pub_key, priv_key

def find_pow_nonce(prefix="Serena"):
    for nonce in itertools.count():
        s = f"{prefix}{nonce}"
        h = hashlib.sha256(s.encode()).hexdigest()
        if h.startswith('0000'):
            return s, nonce, h

def sign_message(priv_key, message):
    signature = rsa.sign(message.encode(), priv_key, 'SHA-256')
    return signature

def verify_signature(pub_key, message, signature):
    try:
        rsa.verify(message.encode(), signature, pub_key)
        return True
    except rsa.VerificationError:
        return False

if __name__ == "__main__":
    # 1. 生成密钥对
    pub_key, priv_key = generate_keys()
    print("密钥对已生成并保存为public.pem和private.pem")
    
    # 2. 寻找符合POW要求的nonce
    message, nonce, hash_val = find_pow_nonce()
    print(f"找到符合要求的nonce: {nonce}, 哈希值: {hash_val}")
    
    # 3. 用私钥签名
    signature = sign_message(priv_key, message)
    print("签名完成")
    
    # 4. 用公钥验证
    is_valid = verify_signature(pub_key, message, signature)
    print(f"验证结果: {'成功' if is_valid else '失败'}")
