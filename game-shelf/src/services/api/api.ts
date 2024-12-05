export function api(path: string, params: Record<string, string> = {}) {
  const baseUrl = "https://api.rawg.io/api";
  const apiKey = "5f0821a82ff040d498edda14f97d1004";

  const url = new URL(baseUrl + path);

  url.searchParams.append("key", apiKey);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return fetch(url.toString())
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error to fetch data:", error);
      throw error;
    });
}