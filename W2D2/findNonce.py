
import hashlib
import time

def find_hash(prefix_length):
    base_str = "Serena"
    nonce = 0
    start_time = time.time()
    
    while True:
        input_str = f"{base_str}{nonce}"
        hash_result = hashlib.sha256(input_str.encode()).hexdigest()
        
        if hash_result.startswith('0' * prefix_length):
            end_time = time.time()
            elapsed = end_time - start_time
            print(f"\nFound {prefix_length} leading zeros!")
            print(f"Input string: {input_str}")
            print(f"SHA256 Hash: {hash_result}")
            print(f"Time taken: {elapsed:.4f} seconds")
            print(f"Nonce tried: {nonce}")
            return
        
        nonce += 1

if __name__ == "__main__":
    print("Starting search for 4 leading zeros...")
    find_hash(4)
    
    print("\nStarting search for 5 leading zeros...")
    find_hash(5)
