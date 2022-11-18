const baseUrl = "http://localhost:8090";

export async function server<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    /**
     * Essa API `fetch` foi incrementada pelo Next.js
     * e é as requisições são feitas no servidor por padrão
     */
    return (
      await fetch(`${baseUrl}/${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch (error) {
    console.log(error);

    throw error;
  }
}
