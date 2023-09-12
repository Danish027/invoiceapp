import type { Metadata } from "next";
import DownloadEstimateClient from "./DownloadEstimateClient";

export const metadata: Metadata = {
  title: "Estimate - Download",
  description: "...",
};
const Page = ({ params }: { params: { estimateNumber: string } }) => {
  const { estimateNumber } = params;
  return <DownloadEstimateClient estimateNumber={estimateNumber} />;
};

export default Page;
