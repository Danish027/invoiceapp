import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useEstimates = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/estimates", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useEstimates;

export const useEstimate = (estimateNumber: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/estimates/${estimateNumber}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
