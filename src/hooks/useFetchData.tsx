/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useFetchData = <T,>(
  request: (args?: any) => Promise<T>,
  args: any
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (args) {
          const res = await request(args);
          setData(res);
        } else {
          const res = await request();
          setData(res);
        }
      } catch (e) {
        setError(
          e instanceof AxiosError ? e : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [args, request]);

  return { data, loading, error };
};
