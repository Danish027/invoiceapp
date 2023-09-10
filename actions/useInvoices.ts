import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useInvoices = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/invoices", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useInvoices;

export const useInvoice = (invoiceNumber: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/invoices/${invoiceNumber}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
