import useSWR, { mutate as globalMutate } from 'swr';
import { useAPIUrl } from '../store';
import { useEffect, useRef } from 'react';
import { medifetch } from '../services/medifetch';

const fetcher = (url: string) => medifetch(url).then(res => {
  if (res.status >= 400) {
    throw new Error("Bad response from server");
  }
  return res.json();
});

export function useFetch(endpoint: string) {
  const firstRender = useRef(true);
  const url = useAPIUrl(s => s.url);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // API url has changed, we need to revalidate all data
    globalMutate(() => true)
  }, [url])

  return { data, error, isLoading, isValidating, mutate }
}
