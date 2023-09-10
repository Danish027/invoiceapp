import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCompany = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/company", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCompany;
