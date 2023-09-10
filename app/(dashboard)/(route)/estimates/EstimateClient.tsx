"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/customeUI/mainPageUI/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsCloudDownload } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";

import { DropdownMenuCheckboxes } from "@/components/customeUI/dashboardUI/DropDown";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

import { Customer, Estimate, Invoice, checkFilter } from "@/schema/type";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import {
  years as yearsData,
  months as monthsData,
  payments as paymentsData,
  approval,
} from "@/data/data";
import useCustomers from "@/actions/useCustomers";
import { format } from "date-fns";
import useEstimates from "@/actions/useEstimates";
import DataTableEstimates from "@/components/customeUI/dashboardUI/DataTableEstimates";
import { downloadToExcelEstimate } from "@/libs/xlsx";
import useCompany from "@/actions/useCompany";

const columms = [
  "Estimate",
  "Date",
  "Customer",
  "Vehicle No.",
  "Amount",
  "Status",
];

const EstimateClient = () => {
  //data fetching
  const { data: estimates, mutate: mutateEstimates } = useEstimates();
  const fetchedInvoice: Estimate[] = estimates;
  const { data: customersData, mutate: mutateCustomers } = useCustomers();
  const { data: companyData } = useCompany();
  const fetchedCustomers: Customer[] = customersData;

  //state declarations
  const [amount, setAmount] = useState(0);
  const [length, setLength] = useState(0);
  const [years, setYears] = useState<checkFilter[]>(yearsData);
  const [months, setMonths] = useState<checkFilter[]>(monthsData);
  const [payments, setPayments] = useState<checkFilter[]>(approval);
  const [customers, setCustomers] = useState<checkFilter[]>(monthsData);
  const [searchInput, setSearchInput] = useState("");
  const handlePaymentChange = useCallback(
    async (status: string, id: number) => {
      try {
        await axios.put(`api/estimates`, { status: status, estimateId: id });
        mutateEstimates();
        toast({
          description: "Saved Changes",
        });

        fetchedInvoice?.sort((a, b) =>
          a.estimateNumber.localeCompare(b.estimateNumber, "en", {
            numeric: true,
          })
        );
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
    [mutateEstimates, fetchedInvoice]
  );
  const [customersDownload, setCustomersDownload] =
    useState<checkFilter[]>(monthsData);
  useEffect(() => {
    const customerLabels = fetchedCustomers?.map((customer: Customer) => ({
      label: customer.name,
      checked: false,
      id: customer.id,
    }));
    setCustomers(customerLabels);
    setCustomersDownload(customerLabels);
  }, [fetchedCustomers]);

  const filterbody = (
    <div className="grid w-full grid-cols-2 gap-4 mt-4">
      <DropdownMenuCheckboxes
        label="Select Year"
        values={years}
        setValues={setYears}
      />
      <DropdownMenuCheckboxes
        label="Select Month"
        values={months}
        setValues={setMonths}
      />
      <DropdownMenuCheckboxes
        label="Select Customer"
        values={customers}
        setValues={setCustomers}
      />
      <DropdownMenuCheckboxes
        label="Payment Status"
        values={payments}
        setValues={setPayments}
      />
    </div>
  );
  // -------------------------Search Filter--------------------------

  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const filteredInvoices = useMemo(() => {
    let filteredData = fetchedInvoice;
    if (searchInput) {
      filteredData = filteredData.filter(
        (invoice) =>
          invoice.estimateNumber.includes(searchInput) ||
          (invoice.vehicleNumber &&
            invoice.vehicleNumber.includes(searchInput.toUpperCase()))
      );
    }
    const selectedCustomers = customers
      ?.filter((customer) => customer.checked)
      .map((customer) => customer.id);
    const selectedYears = years
      ?.filter((year) => year.checked)
      .map((year) => year.label);
    const selectedMonthsLabels = months
      ?.filter((month) => month.checked)
      .map((month) => month.label);
    const selectedPayments = payments
      ?.filter((payment) => payment.checked)
      .map((payment) => payment.label.toLowerCase());
    if (selectedCustomers?.length > 0) {
      filteredData = filteredData.filter((invoice) =>
        selectedCustomers.includes(invoice.companyId)
      );
    }
    if (selectedYears?.length > 0) {
      filteredData = filteredData.filter((invoice) =>
        selectedYears.includes(format(new Date(invoice.date), "yyyy"))
      );
    }

    if (selectedMonthsLabels?.length > 0) {
      filteredData = filteredData.filter((invoice) => {
        const invoiceMonth = format(new Date(invoice.date), "MMMM");
        return selectedMonthsLabels.includes(invoiceMonth);
      });
    }

    if (selectedPayments?.length > 0) {
      filteredData = filteredData.filter((invoice) =>
        selectedPayments.includes(invoice.approvalStatus)
      );
    }
    let filteredAmount = 0;
    filteredData?.forEach((invoice) => {
      if (invoice.taxableAmount !== null) {
        filteredAmount += invoice.taxableAmount;
      }
    });

    const filteredLength = filteredData?.length;

    setAmount(filteredAmount);
    setLength(filteredLength);
    return filteredData;
  }, [fetchedInvoice, months, payments, searchInput, years, customers]);

  // -------------------------Download Filter--------------------------

  const [filteredDownloadInvoice, setFilteredDownloadInvoice] =
    useState<Invoice[]>();

  const [yearsDownload, setYearsDownload] = useState<checkFilter[]>(yearsData);
  const [monthsDownload, setMonthsDownload] =
    useState<checkFilter[]>(monthsData);
  const [paymentsDownload, setPaymentsDownload] =
    useState<checkFilter[]>(approval);

  const downloadBody = (
    <div className="grid w-full grid-cols-2 gap-4 mt-4">
      <DropdownMenuCheckboxes
        label="Select Year"
        values={yearsDownload}
        setValues={setYearsDownload}
      />
      <DropdownMenuCheckboxes
        label="Select Month"
        values={monthsDownload}
        setValues={setMonthsDownload}
      />
      <DropdownMenuCheckboxes
        label="Select Customer"
        values={customersDownload}
        setValues={setCustomersDownload}
      />
      <DropdownMenuCheckboxes
        label="Payment Status"
        values={paymentsDownload}
        setValues={setPaymentsDownload}
      />
    </div>
  );

  const generateNewDataArray = (
    invoices: Estimate[],
    customers: Customer[]
  ) => {
    let key = 1; // Initialize key

    const newDataArray = invoices?.map((invoice) => {
      const customer = customers?.find((c) => c.id === invoice?.companyId);
      const invoiceDate = new Date(invoice.date);
      const formattedDate = format(invoiceDate, "dd-MMM-yyyy");
      const newData = {
        key: key++, // Increment key for each iteration
        estimateNumber: invoice?.estimateNumber,
        date: formattedDate, // Format date as string
        customerName: customer ? customer.name : "N/A", // Get customer name based on customerId
        vehicleNumber: invoice?.vehicleNumber ? invoice?.vehicleNumber : "N/A",
        amount: invoice?.taxableAmount || 0,
        approvalStatus: invoice?.approvalStatus,
      };
      return newData;
    });
    return newDataArray;
  };

  const filteredDownloadInvoices = useCallback(() => {
    let filteredDownloadData = fetchedInvoice;
    const selectedCustomers = customersDownload
      ?.filter((customer) => customer.checked)
      .map((customer) => customer.id);
    const selectedYears = yearsDownload
      ?.filter((year) => year.checked)
      .map((year) => year.label);
    const selectedMonthsLabels = monthsDownload
      ?.filter((month) => month.checked)
      .map((month) => month.label);
    const selectedPayments = paymentsDownload
      ?.filter((payment) => payment.checked)
      .map((payment) => payment.label.toLowerCase());
    if (selectedCustomers?.length > 0) {
      filteredDownloadData = filteredDownloadData?.filter((invoice) =>
        selectedCustomers.includes(invoice.companyId)
      );
    }
    if (selectedYears?.length > 0) {
      filteredDownloadData = filteredDownloadData?.filter((invoice) =>
        selectedYears.includes(format(new Date(invoice.date), "yyyy"))
      );
    }

    if (selectedMonthsLabels?.length > 0) {
      filteredDownloadData = filteredDownloadData?.filter((invoice) => {
        const invoiceMonth = format(new Date(invoice?.date), "MMMM");
        return selectedMonthsLabels?.includes(invoiceMonth);
      });
    }

    if (selectedPayments?.length > 0) {
      filteredDownloadData = filteredDownloadData?.filter((invoice) =>
        selectedPayments.includes(invoice?.approvalStatus)
      );
    }
    const newData = generateNewDataArray(
      filteredDownloadData,
      fetchedCustomers
    );
    console.log(newData);
    downloadToExcelEstimate(newData);
  }, [
    customersDownload,
    fetchedCustomers,
    fetchedInvoice,
    monthsDownload,
    paymentsDownload,
    yearsDownload,
  ]);

  // -------------------------------------jsx code-------------------------

  return (
    <div className="min-h-screen">
      <Header dashboard label="Estimates" />
      <div className="p-4">
        <div className="flex items-center ">
          <div className="flex justify-between items-center flex-col-reverse gap-4 sm:flex-row w-full ">
            <Input
              className="w-full sm:w-2/3"
              placeholder="Search Customer, Items or Invoice...."
              value={searchInput} // Bind value to the search input state
              onChange={handleSearchInputChange}
            />
            <div className="flex gap-3 items-center">
              <AlertDialog
                body={filterbody}
                buttonLabel="Filter"
                description="Please filter as per you requirment"
                submitlabel="Filter"
                title="Filter Dialog"
                buttonSecondaryLabel="Cancel"
                icon={BiFilterAlt}
                outline
              />
              <AlertDialog
                body={downloadBody}
                buttonLabel="Download"
                description="Please filter the values for downloading..."
                submitlabel="Download"
                title="Download Dialog"
                buttonSecondaryLabel="Cancel"
                icon={BsCloudDownload}
                outline
                onClick={filteredDownloadInvoices}
              />
              <Link href="/invoices/new" className="w-full">
                <Button className="h-8">
                  Create <PlusIcon className="font-bold pl-1" fontSize={10} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-4">
          <DataTableEstimates
            fetchedCompany={companyData}
            fetchedCustomers={fetchedCustomers}
            columns={columms}
            data={filteredInvoices}
            onChange={handlePaymentChange}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" disabled>
            Estimates : {length}
          </Button>
          <Button variant="outline" disabled>
            Amount : ₹ {amount.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstimateClient;
