export function bufferHex2Int (buf) {
  const str = buf.toString().slice(2)
  return parseInt(str, 16)
}

export function int2Hex (n) {
  return '0x' + n.toString(16)
}

export function hex2Int (hex) {
  const str = hex.replace('0x', '')
  return parseInt(str, 16)
}
