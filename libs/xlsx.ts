import xlsx, { IJsonSheet } from "json-as-xlsx";

import { Customer, Invoice, Products } from "@/schema/type";

type Invoicedata = {
  key: number;
  invoiceNumber: string;
  date: string;
  customerName: string;
  gstin: string;
  vehicleNumber: string;
  amount: number;
  paymentStatus: string;
};

type EstimateData = {
  key: number;
  estimateNumber: string;
  date: string;
  customerName: string;
  vehicleNumber: string;
  amount: number;
  approvalStatus: string;
};

export function downloadToExcel(invoices: Invoicedata[]) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "Sl No.", value: "key" },
        { label: "Invoice No.", value: "invoiceNumber" },
        { label: "Date", value: "date" },
        { label: "Customer", value: "customerName" },
        { label: "GSTIN", value: "gstin" },
        { label: "Vehicle Number", value: "vehicleNumber" },
        { label: "Amount", value: "amount" },
        { label: "Payment Status", value: "paymentStatus" },
      ],
      content: invoices,
    },
  ];

  let settings = {
    fileName: "Invoices",
  };

  xlsx(columns, settings);
}

export function downloadToExcelEstimate(invoices: EstimateData[]) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "Sl No.", value: "key" },
        { label: "Estimate No.", value: "estimateNumber" },
        { label: "Date", value: "date" },
        { label: "Customer", value: "customerName" },
        { label: "Vehicle Number", value: "vehicleNumber" },
        { label: "Amount", value: "amount" },
        { label: "Approval Status", value: "approvalStatus" },
      ],
      content: invoices,
    },
  ];

  let settings = {
    fileName: "Estimates",
  };

  xlsx(columns, settings);
}

export function downloadToExcelCustomer(customers: Customer[]) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "GSTIN", value: "gstin" },
        { label: "Name", value: "name" },
        { label: "Address Line 1", value: "addressLine1" },
        { label: "Address Line 2", value: "addressLine2" },
        { label: "State", value: "state" },
      ],
      content: customers,
    },
  ];

  let settings = {
    fileName: "Customers",
  };

  xlsx(columns, settings);
}

export function downloadToExcelProducts(products: Products[]) {
  let columns: IJsonSheet[] = [
    {
      sheet: "Persons",
      columns: [
        { label: "Description", value: "description" },
        { label: "HSN Code ", value: "hnsCode" },
        { label: "Quantity", value: "quantity" },
        { label: "Unit", value: "unit" },
        { label: "Rate", value: "rate" },
      ],
      content: products,
    },
  ];

  let settings = {
    fileName: "Products",
  };

  xlsx(columns, settings);
}
