import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/products", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProducts;
