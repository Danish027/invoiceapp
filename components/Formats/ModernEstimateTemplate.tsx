"use client";
import "@/app/globals.scss";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Company, Customer, Estimate, Invoice } from "@/schema/type";
import { Button } from "@/components/ui/button";
import { ToWords } from "to-words";
const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/custome-table";
import Link from "next/link";

interface EstimatePdfProps {
  invoiceData: Estimate;
  customer: Customer[];
  company: Company;
  onClick?: () => void;
  show?: boolean;
  invoiceNumber: string;
}
const ModernEstimateTemplate: React.FC<EstimatePdfProps> = ({
  company,
  customer,
  invoiceData,
  onClick,
  show,
  invoiceNumber,
}) => {
  // const [invoiceData, setInvoiceData] = useState<Invoice>();
  const [loading, setLoading] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();

  const pdfref = useRef<HTMLDivElement>(null);
  const generatePDF = useReactToPrint({
    content: () => pdfref.current,
    documentTitle: `EST${invoiceData?.estimateNumber}`,
  });
  let newDate = "Date";
  if (invoiceData !== undefined) {
    newDate = invoiceData?.date?.toString();
  }

  useEffect(() => {
    if (
      invoiceData === undefined ||
      customer === undefined ||
      company === undefined
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    let selectedCustomer;
    if (invoiceData?.id !== undefined && customer !== undefined) {
      for (let i = 0; i < customer.length; i++) {
        if (invoiceData?.companyId === customer[i]?.id) {
          selectedCustomer = customer[i];
          break;
        }
      }
      if (selectedCustomer !== undefined) {
        setCurrentCustomer(selectedCustomer);
      }
    }
  }, [customer, invoiceData, company, currentCustomer]);

  function formatDateString(inputDate: string) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Parse the input date string into a Date object
    const dateObj = new Date(inputDate);

    // Increment the date by one day
    dateObj.setDate(dateObj.getDate() + 1);

    // Get day, month, and year parts
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    // Format and return the date string
    return `${day}-${month}-${year}`;
  }

  const selectedPart = formatDateString(newDate?.slice(0, 10));
  if (loading === true) {
    return (
      <div className="flex w-full h-screen justify-center items-center flex-col">
        <div className="text-xl">Data fetching in process</div>
        <div>Please wait....</div>
      </div>
    );
  }
  if (show === false) {
    return null;
  }

  function formatInvoiceNumber(invoiceNumber: number) {
    if (invoiceNumber === undefined) {
      return ""; // Handle undefined case gracefully
    }

    if (invoiceNumber < 10) {
      // Add two zeros in the prefix
      return `00${invoiceNumber}`;
    } else if (invoiceNumber < 100) {
      // Add a single zero in the prefix
      return `0${invoiceNumber}`;
    } else {
      // Invoice number is 100 or greater, no prefix
      return `${invoiceNumber}`;
    }
  }
  const subTotal = invoiceData?.items?.reduce((accumulator, item) => {
    return accumulator + item?.amount;
  }, 0);
  const rateTotal = invoiceData?.items?.reduce((accumulator, item) => {
    return accumulator + item?.rate;
  }, 0);
  const quantityTotal = invoiceData?.items?.reduce((accumulator, item) => {
    return accumulator + item?.quantity;
  }, 0);

  return (
    <div className="fixed top-0 left-0 bg-background z-50  ">
      <div className="w-screen h-screen overflow-y-scroll overflow-x-scroll">
        <div className="m-4 flex justify-between  ">
          <div className="ml-4">
            <Button variant="outline" onClick={onClick}>
              Back
            </Button>
          </div>
          <div className="flex">
            <Button variant="outline" onClick={onClick}>
              <Link href={`/estimates/${invoiceNumber}`}>Edit</Link>
            </Button>
            <div className="mx-4 w-32">
              <Button onClick={generatePDF}>Download</Button>
            </div>
          </div>
        </div>
        <div ref={pdfref} className="w-full h-auto">
          {/* ----------Top Bar---------- */}
          <div className="flex justify-between items-center mx-4 p-0 m-0">
            <div className="mx-4 text-sm">GSTIIN : {company?.gstin}</div>
            <div className="text-center m-3 text-sm font-bold">ESTIMATE</div>
            <div className="mx-4 text-sm">
              Contact No.: {company?.mobileNumber}
            </div>
          </div>
          <div className="mx-4">
            <div className=" mx-4">
              {/* ----------Company Info---------- */}
              <div className="text-center -mt-2 border-b pb-2">
                <div className="font-bold text-xl pb-1 uppercase tracking-wide leading-none">
                  {company?.name}
                </div>
                <div className="leading-none text-sm">
                  {company?.addressLine1}
                </div>
                <div className="text-sm leading-none">
                  {company?.addressLine2}
                </div>
                <div className="leading-none text-sm">
                  State : {company?.state}, E-mail : {company?.email}
                </div>
              </div>

              <div className="flex justify-between mr-4">
                {/* ----------Buyer Info---------- */}
                <div className=" text-start">
                  <div>To,</div>
                  <div className="font-bold ">{currentCustomer?.name}</div>
                  <div className="leading-none">
                    {currentCustomer?.addressLine1}
                  </div>
                  <div>{currentCustomer?.addressLine2}</div>
                  <div className="leading-none">
                    GSTIIN : {currentCustomer?.gstin}
                  </div>
                  <div>State : {currentCustomer?.state}</div>
                </div>
                {/* ----------Invoice Info---------- */}
                <div className="grid grid-cols-2 leading-none  ">
                  <div className="h-10"></div>
                  <div></div>
                  <div>Estimate No.</div>
                  <div className="font-bold ">
                    : {formatInvoiceNumber(Number(invoiceData?.estimateNumber))}
                  </div>
                  <div>Date</div>
                  <div className="font-bold ">: {selectedPart}</div>
                  <div>Vehicle No.</div>
                  <div className="font-bold">
                    :{" "}
                    {invoiceData?.vehicleNumber
                      ? invoiceData?.vehicleNumber
                      : "N/A"}
                  </div>
                  {invoiceData?.optionalField?.value !== 0 && (
                    <>
                      <div>{invoiceData?.optionalField?.label}</div>
                      <div className="font-bold">
                        : {invoiceData?.optionalField?.value}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ----------Items Table---------- */}
              <div className="mt-4 min-h-[600px] ">
                <Table>
                  <TableHeader className="">
                    <TableRow className="border-none bg-gray-300">
                      <TableCell className="w-4 font-bold border-none ">
                        #
                      </TableCell>
                      <TableCell className="w-[300px] font-bold border-none">
                        Description
                      </TableCell>
                      <TableCell className="w-20 font-bold border-none text-end">
                        HSN/SAS
                      </TableCell>
                      <TableCell className="w-20 font-bold border-none text-end">
                        Quantity
                      </TableCell>
                      <TableCell className="w-20 font-bold border-none text-end">
                        Rate/Unit
                      </TableCell>
                      <TableCell className="w-20 font-bold border-none text-end">
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="">
                    {/* --------------Items --------------- */}
                    {invoiceData?.items?.map((item, index) => (
                      <TableRow key={item.id} className="">
                        <TableCell className="leading-none text-start border-none align-top">
                          {index + 1}
                        </TableCell>
                        <TableCell className=" leading-none border-none">
                          {item.description}
                        </TableCell>
                        <TableCell className="leading-none border-none text-end align-top">
                          {item.hsncode}
                        </TableCell>
                        <TableCell className="leading-none border-none text-end align-top">
                          {item.quantity < 10
                            ? `0${item.quantity.toFixed(2)}`
                            : item.quantity.toFixed(2)}
                          {item.unit}
                        </TableCell>
                        <TableCell className="leading-none border-none text-end align-top">
                          {item.rate.toFixed(2)}
                        </TableCell>

                        <TableCell className="leading-none border-none text-end align-top">
                          {item.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* --------------Empty --------------- */}
                    <TableRow className="border-none  ">
                      <TableCell className="border-none  h-4"></TableCell>
                      <TableCell className="border-none   w-[180px] text-right font-bold"></TableCell>
                      <TableCell className="border-none  "></TableCell>
                      <TableCell className="border-none  "></TableCell>

                      <TableCell className="border-none  "></TableCell>
                      <TableCell className="border-none   font-bold"></TableCell>
                    </TableRow>
                    {/* --------------Total--------------- */}
                  </TableBody>
                  <TableHeader className="border-t border-b border-gray-300 mt-2">
                    <TableRow className="p-0 m-0">
                      <TableCell className="border-none border-t border-b border-black "></TableCell>
                      <TableCell className=" border-none   font-bold">
                        Total
                      </TableCell>
                      <TableCell className=" font-bold border-none "></TableCell>
                      <TableCell className="border-none font-bold text-end">
                        {quantityTotal?.toFixed(2)}
                      </TableCell>

                      <TableCell className="border-none font-bold text-end">
                        {rateTotal?.toFixed(2)}
                      </TableCell>
                      <TableCell className="border-none font-bold text-end">
                        {subTotal?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                </Table>
                {/* --------------Summary--------------- */}
                <div className="flex justify-between mt-3">
                  <div className=" w-2/3 pr-5">
                    <div className="font-bold ">Amount (In Words) :</div>
                    <div>
                      INR{" "}
                      {invoiceData?.taxableAmount &&
                        toWords.convert(
                          invoiceData?.taxableAmount,

                          {
                            currency: true,
                          }
                        )}
                    </div>
                    <div className="mt-2">
                      Company&apos;s PAN : {company?.panNumber}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 ">
                    <div className="pr-5">Sub Total</div>
                    <div className="text-end pr-2">{subTotal?.toFixed(2)}</div>
                    {invoiceData?.additinalCharges?.value !== 0 && (
                      <>
                        <div className="">
                          {invoiceData?.additinalCharges?.label}
                        </div>
                        <div className="text-end pr-2">
                          {invoiceData?.additinalCharges?.value &&
                            Number(
                              invoiceData?.additinalCharges?.value
                            )?.toFixed(2)}
                        </div>
                      </>
                    )}
                    {invoiceData?.discount?.value !== 0 && (
                      <>
                        <div className="">{invoiceData?.discount?.label}</div>
                        <div className="text-end pr-2">
                          {invoiceData?.discount?.value &&
                            Number(invoiceData?.discount?.value)?.toFixed(2)}
                        </div>
                      </>
                    )}

                    <div className="font-bold border-t border-b">Total</div>
                    <div className="font-bold border-t border-b text-end pr-2">
                      {invoiceData?.taxableAmount &&
                        invoiceData?.taxableAmount?.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------Company and declaration--------------- */}
              <div className="flex justify-between">
                <div className="w-2/3">
                  <div className="font-bold underline">
                    Company&rsquo;s Bank Details
                  </div>
                  <div className="py-[2px] leading-none">
                    Bank Name
                    <span className="leading-none">: {company?.bankName}</span>
                  </div>
                  <div className="leading-none py-[2px]">
                    A/C Number
                    <span className=" leading-none">
                      : {company?.accountNumber}{" "}
                    </span>
                  </div>
                  <div className="leading-none py-[2px]">
                    Branch & IFSC{" "}
                    <span className=" leading-none">
                      : {company?.bankBranch} {company?.ifscCode}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold underline">Declaration</div>
                    <div className="leading-none">{company?.declaration}</div>
                  </div>
                </div>
                <div className="flex justify-around items-center flex-col ">
                  <div>For {company?.name}</div>
                  <div>Authorised Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEstimateTemplate;
