export const queryFn = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, init);

  return await response.json();
};

export const makeUrl = (
  baseUrl: string,
  urlSearchParams?: URLSearchParams,
): string => {
  const params = new URLSearchParams(urlSearchParams);
  return params.size > 0 ? `${baseUrl}?${params.toString()}` : baseUrl;
};
