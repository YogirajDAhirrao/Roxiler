const BASE_URL = "http://localhost:5000/api";
export async function apiFetch(
  endPoint,
  { method = "GET", body, headers = {} } = {}
) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
  };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(`${BASE_URL}${endPoint}`, options);
  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.log(error);
    data = null;
  }
  if (!response.ok) {
    throw new Error(data?.message || `API Error: ${response.status}`);
  }

  return data;
}
