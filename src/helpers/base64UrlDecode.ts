export function base64UrlDecoded(input: string): string {
  let base64 = input.replace("-", "+").replace("_", "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return atob(base64);
}
