const secretKey = import.meta.env.VITE_JWS_SECRET_KEY || "";

export function enmascarar(identificador: string): string {
  const textoParaEncriptar =
    secretKey.split("").reverse().join("") + identificador + secretKey;

  const textoEncriptado = btoa(textoParaEncriptar);

  return textoEncriptado;
}

export function desenmascarar(identificadorEncriptado: string): string | null {
  try {
    const textoDesencriptado = atob(identificadorEncriptado);
    const secretKeyReversed = secretKey.split("").reverse().join("");

    if (
      textoDesencriptado.startsWith(secretKeyReversed) &&
      textoDesencriptado.endsWith(secretKey)
    ) {
      return textoDesencriptado.substring(
        secretKeyReversed.length,
        textoDesencriptado.length - secretKey.length
      );
    } else {
      return null;
    }
  } catch (error) {
    // Captura el error y devuelve null si algo falla
    return null;
  }
}
