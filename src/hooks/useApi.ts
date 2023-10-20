import useSWR, { mutate as globalMutate } from 'swr';
import { useAPIUrl } from '../state';
import { useEffect, useRef } from 'react';

export function useApi(endpoint: string) {
  const medifetch = useAPIUrl(s => s.medifetch);
  const firstRender = useRef(true);
  const url = useAPIUrl(s => s.url);

  const { data, error, isLoading, isValidating, mutate } = useSWR(endpoint, medifetch);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    globalMutate(() => true)
  }, [url])

  return { data, error, isLoading, isValidating, mutate }
}
