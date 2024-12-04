type FetchConfig = RequestInit;

const client = async <T>(
  endpoint: string,
  customConfig: FetchConfig = {}
): Promise<T> => {
  const config: FetchConfig = {
    method: "GET",
    ...customConfig,
  };

  const response = await fetch(`https://api.github.com/${endpoint}`, config);
  const data = await response.json();

  if (response.ok) {
    return data as T;
  } else {
    return Promise.reject(data);
  }
};

export { client };
