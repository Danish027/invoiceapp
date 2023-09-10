import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCustomers = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/customers", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCustomers;

export const useCustomer = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/customers/${id}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
