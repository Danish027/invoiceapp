"use client";
import React from "react";
import { AnalyticsCard } from "./AnalyticsCard";
import { DataAnalytics } from "@/schema/type";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";

interface AnalyticsSectionProps {
  dataAnalytics: DataAnalytics;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  dataAnalytics,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        label="Total Revenue"
        symbol
        icon={BsCurrencyRupee}
        value={dataAnalytics.totalAmount}
        growth={dataAnalytics.totalAmountRate}
      />
      <AnalyticsCard
        // icon={MdOutlineVerifiedUser}
        icon={GoVerified}
        label="Total Payment Received"
        symbol
        value={dataAnalytics.totalAmountPaid}
        growth={dataAnalytics.totalAmountPaidRate}
      />
      <AnalyticsCard
        icon={TbFileInvoice}
        label="Total Invoices Created"
        value={dataAnalytics.totalInvoices}
        growth={dataAnalytics.totalInvoicesRate}
      />
      <AnalyticsCard
        icon={AiOutlineUser}
        label="Total Customers"
        value={dataAnalytics.totalCustomers}
        growth={dataAnalytics.totalCustomersRate}
      />
    </div>
  );
};

export default AnalyticsSection;
