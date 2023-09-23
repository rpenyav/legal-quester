import { base64UrlDecoded } from "./";

export function decodeJWT(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("El token JWT no es válido");
  }
  const payload = parts[1];
  const decodedPayload = base64UrlDecoded(payload);
  return JSON.parse(decodedPayload);
}
