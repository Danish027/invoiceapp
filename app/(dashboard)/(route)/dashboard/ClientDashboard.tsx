"use client";

import {
  Company,
  Customer,
  DataAnalytics,
  Invoice,
  SafeUser,
  TopCustomers,
} from "@/schema/type";
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/customeUI/mainPageUI/Header";
import AnalyticsSection from "@/components/customeUI/mainPageUI/AnalyticsSection";
import PieChart from "@/components/customeUI/dashboardUI/PieChart";
import LineChart from "@/components/customeUI/dashboardUI/LineChart";
import useCompany from "@/actions/useCompany";
import useInvoices from "@/actions/useInvoices";
import useCustomers from "@/actions/useCustomers";
import Loading from "./loading";

export type InvoiceSummary = {
  invoiceNumber: string;
  amount: number;
  paymentStatus: string;
  month: string;
};

export type InvoiceAnalytics = {
  month: string;
  Invoices: number; // Change variable name and reorder
  Amount: number; // Change variable name and reorder
  "Amount-Paid": number; // Change variable name and reorder
  "Total-Amount": number; // Change variable name and reorder
  "Total-Amount-Paid": number; // Change variable name and reorder
};

const ClientDashboard = () => {
  const { data: fetchedCompany } = useCompany();
  const { data: fetchedInvoices } = useInvoices();
  const { data: fetchedCustomers } = useCustomers();
  const [company, setCompany] = useState<Company>(fetchedCompany);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>(fetchedInvoices);
  const [customers, setCustomers] = useState<Customer[]>(fetchedCustomers);
  const [topCustomers, setTopCustomers] = useState<TopCustomers[]>([
    { amount: 0, invoices: 0, name: "" },
  ]);
  const [dataAnalytics, setDataAnalytics] = useState<DataAnalytics>({
    totalAmount: 0,
    totalAmountRate: 0,
    totalAmountPaid: 0,
    totalAmountPaidRate: 0,
    totalInvoices: 0,
    totalInvoicesRate: 0,
    totalCustomers: 0,
    totalCustomersRate: 1,
  });
  const [invoiceSummaries, setInvoiceSummaries] = useState<InvoiceSummary[]>(
    []
  );
  const [invoiceAnalytics, SetInvoiceAnalytics] = useState<InvoiceAnalytics[]>(
    []
  );

  useEffect(() => {
    if (
      company !== undefined &&
      customers !== undefined &&
      invoices !== undefined
    ) {
      setLoading(false);
    }
  }, [invoices, customers, company]);
  useEffect(() => {
    setCompany(fetchedCompany);
    setInvoices(fetchedInvoices);
    setCustomers(fetchedCustomers);
  }, [fetchedCompany, fetchedInvoices, fetchedCustomers]);

  const calculateTopCustomers = useCallback(
    (invoices: Invoice[], customers: Customer[]) => {
      invoices = invoices ?? []; // Ensure invoices is an array
      const customerInvoicesMap = new Map<
        number,
        { name: string; invoices: number; amount: number }
      >();

      // Calculate total amount for each customer
      for (const invoice of invoices) {
        const customerId = invoice?.customerId;
        const customer = customers?.find((c) => c.id === customerId);

        if (customer) {
          const existingCustomerData = customerInvoicesMap?.get(customerId) || {
            name: customer?.name,
            invoices: 0,
            amount: 0,
          };
          existingCustomerData.invoices++;
          existingCustomerData.amount += invoice?.taxableAmount || 0;
          customerInvoicesMap.set(customerId, existingCustomerData);
        }
      }

      // Sort customers by total amount (highest first)
      const sortedCustomers = Array.from(customerInvoicesMap.values()).sort(
        (a, b) => b.amount - a.amount
      );

      // Get the top 5 customers
      const topCustomers = sortedCustomers.slice(0, 5);

      // Calculate total invoices and amount for the "Others" category
      const otherCustomers = sortedCustomers.slice(5);
      const otherInvoices = otherCustomers.reduce(
        (totalInvoices, customer) => totalInvoices + customer.invoices,
        0
      );
      const otherAmount = otherCustomers.reduce(
        (totalAmount, customer) => totalAmount + customer.amount,
        0
      );

      // Create the "Others" entry
      if (otherInvoices > 0) {
        topCustomers.push({
          name: "Others",
          invoices: otherInvoices,
          amount: otherAmount,
        });
      }

      return topCustomers;
    },
    []
  );

  const createInvoiceSummaries = useCallback(
    (invoices: Invoice[] | undefined) => {
      if (!invoices || !Array.isArray(invoices)) {
        // Handle the case where invoices is not an array or is undefined
        return [];
      }

      const summaries: InvoiceSummary[] = [];

      for (const invoice of invoices) {
        const date = new Date(invoice.date);

        if (isNaN(date.getTime())) {
          // Skip invalid dates
          continue;
        }

        // Format the month as "Mon-YY"
        const month = `${date.toLocaleString("default", {
          month: "short",
        })}-${date.getFullYear().toString().slice(-2)}`;

        const summary: InvoiceSummary = {
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.taxableAmount || 0,
          paymentStatus: invoice.paymentStatus,
          month: month,
        };

        summaries.push(summary);
      }

      return summaries;
    },
    []
  );

  const calculateInvoiceAnalytics = useCallback(
    (invoiceSummaries: InvoiceSummary[]) => {
      const analyticsMap: Map<string, InvoiceAnalytics> = new Map();

      for (let i = 0; i < invoiceSummaries.length; i++) {
        const summary = invoiceSummaries[i];
        if (summary) {
          const { month, amount, paymentStatus } = summary;

          let TotalAmount = 0; // Change variable name
          let AmountPaid = 0; // Change variable name
          let TotalPreviousAmount = 0; // Change variable name
          let TotalPreviousPaidAmount = 0; // Change variable name

          // Calculate TotalPreviousAmount and TotalPreviousPaidAmount by summing previous months
          for (let j = 0; j < i; j++) {
            const previousSummary = invoiceSummaries[j];
            if (previousSummary) {
              TotalPreviousAmount += previousSummary.amount || 0;
              if (previousSummary.paymentStatus === "paid") {
                TotalPreviousPaidAmount += previousSummary.amount || 0;
              }
            }
          }

          if (!analyticsMap.has(month)) {
            analyticsMap.set(month, {
              month,
              Invoices: 0, // Change variable name and reorder
              Amount: 0, // Change variable name and reorder
              "Amount-Paid": 0, // Change variable name and reorder
              "Total-Amount": 0, // Change variable name and reorder
              "Total-Amount-Paid": 0, // Change variable name and reorder
            });
          }

          const analytics = analyticsMap.get(month);

          if (analytics) {
            analytics.Invoices += 1; // Change variable name and reorder
            analytics.Amount += amount || 0; // Change variable name and reorder
            if (paymentStatus === "paid") {
              analytics["Amount-Paid"] += amount || 0; // Change variable name and reorder
            }
            analytics["Total-Amount"] += TotalAmount || 0; // Change variable name and reorder
            analytics["Total-Amount-Paid"] += AmountPaid || 0; // Change variable name and reorder
          }
        }
      }

      return Array.from(analyticsMap.values());
    },
    []
  );

  const updatePreviousTotals = useCallback(
    (analyticsData: InvoiceAnalytics[]) => {
      let previousTotalAmount = 0;
      let previousTotalPaidAmount = 0;

      return analyticsData.map((analytics) => {
        const updatedAnalytics = {
          ...analytics,
          "Total-Amount": previousTotalAmount + analytics.Amount, // Change variable name and reorder
          "Total-Amount-Paid":
            previousTotalPaidAmount + analytics["Amount-Paid"], // Change variable name and reorder
        };

        previousTotalAmount = updatedAnalytics["Total-Amount"]; // Change variable name and reorder
        previousTotalPaidAmount = updatedAnalytics["Total-Amount-Paid"]; // Change variable name and reorder

        return updatedAnalytics;
      });
    },
    []
  );

  const calculateTotalDataAnalytics = (analyticsData: InvoiceAnalytics[]) => {
    const totalDataAnalytics = {
      totalAmount: 0,
      totalAmountRate: 0,
      totalAmountPaid: 0,
      totalAmountPaidRate: 0,
      totalInvoices: 0,
      totalInvoicesRate: 0,
      totalCustomers: 0,
      totalCustomersRate: 1,
    };

    if (analyticsData.length >= 2) {
      const currentMonth = analyticsData[analyticsData.length - 1];
      const previousMonth = analyticsData[analyticsData.length - 2];

      if (currentMonth && previousMonth) {
        totalDataAnalytics.totalAmount = currentMonth["Total-Amount"];
        totalDataAnalytics.totalAmountPaid = currentMonth["Total-Amount-Paid"];
        totalDataAnalytics.totalInvoices = currentMonth.Invoices;

        if (previousMonth["Total-Amount"] > 0) {
          totalDataAnalytics.totalAmountRate =
            ((currentMonth["Total-Amount"] - previousMonth["Total-Amount"]) /
              previousMonth["Total-Amount"]) *
            100;
        }

        if (previousMonth["Total-Amount-Paid"] > 0) {
          totalDataAnalytics.totalAmountPaidRate =
            ((currentMonth["Total-Amount-Paid"] -
              previousMonth["Total-Amount-Paid"]) /
              previousMonth["Total-Amount-Paid"]) *
            100;
        }

        if (previousMonth.Invoices > 0) {
          totalDataAnalytics.totalInvoicesRate =
            ((currentMonth.Invoices - previousMonth.Invoices) /
              previousMonth.Invoices) *
            100;
        }
        if (fetchedCustomers !== undefined) {
          totalDataAnalytics.totalCustomers = fetchedCustomers.length;
        }
      }
      totalDataAnalytics.totalInvoices = fetchedInvoices.length;
    }

    console.log("Output:");
    console.log(totalDataAnalytics);
    return totalDataAnalytics;
  };

  useEffect(() => {
    // Update the invoiceSummaries whenever invoices change
    setInvoiceSummaries(createInvoiceSummaries(invoices));
  }, [invoices, createInvoiceSummaries]);

  useEffect(() => {
    // Calculate and log invoice analytics whenever invoiceSummaries change
    const sample = calculateInvoiceAnalytics(invoiceSummaries);
    const analytics = updatePreviousTotals(sample);
    // console.log(analytics);
    SetInvoiceAnalytics(analytics);

    // Calculate total data analytics
    const totalDataAnalytics = calculateTotalDataAnalytics(analytics);
    setDataAnalytics(totalDataAnalytics);
    const topCustomersData = calculateTopCustomers(invoices, customers);
    setTopCustomers(topCustomersData);
  }, [
    invoiceSummaries,
    calculateInvoiceAnalytics,
    updatePreviousTotals,
    customers,
    invoices,
    calculateTopCustomers,
  ]);

  if (loading === true) {
    return <Loading />;
  }
  // console.log("Total Data Analytics:", dataAnalytics);
  return (
    <div className="min-h-screen">
      <Header dashboard label="Dashboard" />
      <div className="p-4 flex flex-col gap-4">
        <div className="pl-1 text-foreground text-xl sm:text-2xl tracking-wider">
          {company?.name}
        </div>
        <AnalyticsSection dataAnalytics={dataAnalytics} />
        <LineChart analytics={invoiceAnalytics} />
        <PieChart analytics={topCustomers} />
      </div>
    </div>
  );
};

export default ClientDashboard;
