export function hexToBytes(inputHexString: string): Uint8Array {
  let hexString = inputHexString;
  if (!hexString) return new Uint8Array();
  else if (!/^(0x)?[0-9a-fA-F]*$/.test(hexString)) {
    throw new Error("Invalid hex string");
  } else if (hexString.length % 2 !== 0) {
    throw new Error("The hex string has an odd length");
  }

  hexString = hexString.startsWith("0x") ? hexString.substring(2) : hexString;
  const bytes: number[] = [];
  for (let i = 0; i < hexString.length; i += 2) {
    bytes.push(parseInt(hexString.substring(i, i + 2), 16));
  }
  return Uint8Array.from(bytes);
}
