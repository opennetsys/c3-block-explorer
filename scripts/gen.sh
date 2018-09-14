#!/bin/sh

# Generate demo chain

block=0
prev=""

while [ $block -lt 10 ]; do
  tx=0
  base=$(ipfs object new unixfs-dir)
  blockinfo=$(echo "{\"blockhash\": \"blockhashABC$block\"}" | ipfs add -q)
  base=$(ipfs object patch "$base" add-link "block$block" "$blockinfo")
  if [ ! -z "$prev" ]; then
    base=$(ipfs object patch "$base" add-link prevblock "$prev")
  fi

  while [ $tx -lt 10 ]; do
    txipfshash=$(echo "{\"txhash\": \"txhashABC$tx\"}" | ipfs add -q)
    base=$(ipfs object patch "$base" add-link "tx$tx" "$txipfshash")
    echo "$base"
    tx=$((tx+1))
  done
  block=$((block+1))
  prev=$base
done

echo "http://localhost:9001/ipfs/$base"
