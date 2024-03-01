import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useFetchData = <T,>(request: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await request();
        setData(res);
      } catch (e) {
        setError(
          e instanceof AxiosError ? e : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [request]);

  return { data, loading, error };
};
