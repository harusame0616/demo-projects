function base64ToBytes(base64: string) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0)!);
}

export function decodeBase64(encoded: string) {
  try {
    return new TextDecoder().decode(base64ToBytes(encoded));
  } catch {
    return encoded;
  }
}

function bytesToBase64(bytes: Uint8Array) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

export function encodeToBase64(str: string) {
  return bytesToBase64(new TextEncoder().encode(str));
}
