"use client";
import "@/app/globals.scss";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Company, Customer, Invoice } from "@/schema/type";
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

interface InvoicePdfProps {
  invoiceData: Invoice;
  customer: Customer[];
  company: Company;
  onClick?: () => void;
  show?: boolean;
  invoiceNumber: string;
}
const ClassicInvoiceTemplate: React.FC<InvoicePdfProps> = ({
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
  const [rows, setRows] = useState<number[]>();
  const pdfref = useRef<HTMLDivElement>(null);
  const generatePDF = useReactToPrint({
    content: () => pdfref.current,
    documentTitle: `INV${invoiceData?.invoiceNumber}`,
    // onAfterPrint: () => alert(`INV${invoiceData?.invoiceNumber}`),
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
        if (invoiceData?.customerId === customer[i]?.id) {
          selectedCustomer = customer[i];
          break;
        }
      }
      if (selectedCustomer !== undefined) {
        setCurrentCustomer(selectedCustomer);
      }
    }

    if (invoiceData !== undefined) {
      const itemslength = invoiceData?.items?.length;
      const gstTypeRow = invoiceData?.invoiceType === "state" ? 2 : 1;
      const addChargesRow = invoiceData?.additinalCharges?.value === 0 ? 0 : 1;
      const discountRow = invoiceData?.discount?.value === 0 ? 0 : 1;
      const sum = itemslength + gstTypeRow + addChargesRow + discountRow;
      if (sum > 10) {
        setRows([]);
      } else {
        const totalRow = 9 - sum;
        const rowArray = Array.from(
          { length: totalRow },
          (_, index) => index + 1
        );
        setRows(rowArray);
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
      <>
        <div>Loading....</div>
      </>
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
  return (
    <div className="fixed top-0 left-0 bg-background z-50  ">
      <div className="w-screen h-screen overflow-y-scroll overflow-x-scroll">
        <div className="m-4 flex justify-between  ">
          <div className="w-32">
            <Button variant="outline" onClick={onClick}>
              Back
            </Button>
          </div>
          <div className="flex">
            <Button variant="outline" onClick={onClick}>
              <Link href={`/invoices/${invoiceNumber}`}>Edit</Link>
            </Button>
            <div className="mx-4 w-32">
              <Button onClick={generatePDF}>Download</Button>
            </div>
          </div>
        </div>
        <div ref={pdfref} className="w-full h-auto">
          <div className="text-center m-3 text-lg font-bold">TAX INVOICE</div>
          <div className="m-4">
            <div className=" m-4 border border-black">
              <div className="grid grid-cols-2 ">
                <>
                  <div>
                    <div className="border  border-black  px-3 pb-2">
                      <div className="font-bold ">{company?.name}</div>
                      <div className="leading-none">
                        {company?.addressLine1}
                      </div>
                      <div>{company?.addressLine2}</div>
                      <div className="leading-none">
                        GSTIIN : {company?.gstin}
                      </div>
                      <div>State : {company?.state}</div>
                    </div>
                    <div className="border border-black  px-3">
                      <div>Buyer,</div>
                      <div className="font-bold ">{currentCustomer?.name}</div>
                      <div className="">{currentCustomer?.addressLine1}</div>
                      <div>{currentCustomer?.addressLine2}</div>
                      <div>GSTIIN : {currentCustomer?.gstin}</div>
                      <div>State : {currentCustomer?.state}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="border border-black px-3">
                      <div>Invoice No.</div>
                      <div className="font-bold">
                        {/* INV{invoiceData?.invoiceNumber} */}

                        {formatInvoiceNumber(
                          Number(invoiceData?.invoiceNumber)
                        )}
                      </div>
                    </div>
                    <div className="border border-black px-3">
                      <div>Date</div>
                      <div className="font-bold">{selectedPart}</div>
                    </div>
                    <div className="border border-black  px-3 pb-2">
                      <div>Delivery Note</div>
                      <div></div>
                    </div>
                    <div className="border border-black  px-3">
                      <div>Terms of Payment</div>
                      <div></div>
                    </div>

                    <div className="border border-black  px-3">
                      <div>Buyer&rsquo;s Order No.</div>
                      <div></div>
                    </div>
                    <div className="border border-black  px-3  pb-2">
                      <div>Dated</div>
                      <div></div>
                    </div>
                    <div className="border border-black  px-3 pb-2">
                      <div>Dispatch Document No.</div>
                      <div></div>
                    </div>
                    <div className="border border-black  px-3">
                      <div>Delivery Note Date</div>
                      <div></div>
                    </div>
                    <div className="border border-black  px-3 pb-2">
                      <div>Dispatch through</div>
                      <div></div>
                    </div>
                    <div className="border border-black  px-3">
                      <div>Destination</div>
                      <div></div>
                    </div>
                    <div className="border border-black  px-3 col-span-2">
                      <div>Vehilce Number</div>
                      <div className="font-bold">
                        {invoiceData?.vehicleNumber
                          ? invoiceData?.vehicleNumber
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </>
              </div>

              <div className="">
                <Table>
                  <TableHeader>
                    <TableRow className="border-black">
                      <TableCell className="w-4 border-l font-bold">
                        Sl
                      </TableCell>
                      <TableCell className="w-[180px] font-bold">
                        Description
                      </TableCell>
                      <TableCell className="w-20 font-bold">HSN/SAS</TableCell>
                      <TableCell className="w-24 font-bold">Quantity</TableCell>
                      <TableCell className="w-20 font-bold">Rate</TableCell>
                      <TableCell className="w-4 font-bold">Per</TableCell>
                      <TableCell className="w-24 font-bold">Amount</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b border-black">
                    {/* --------------Items --------------- */}
                    {invoiceData?.items?.map((item, index) => (
                      <TableRow key={item.id} className="border-leading-none">
                        <TableCell className="border-l leading-none text-start">
                          {index + 1}
                        </TableCell>
                        <TableCell className=" w-[180px] leading-none">
                          {item.description}
                        </TableCell>
                        <TableCell className="leading-none">
                          {item.hsncode}
                        </TableCell>
                        <TableCell className="leading-none">
                          {item.quantity < 10
                            ? `0${item.quantity.toFixed(2)}`
                            : item.quantity.toFixed(2)}
                          {item.unit}
                        </TableCell>
                        <TableCell className="leading-none">
                          {item.rate.toFixed(2)}
                        </TableCell>
                        <TableCell className="leading-none">{}</TableCell>
                        <TableCell className="leading-none ">
                          {item.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* --------------Additional Charges--------------- */}
                    {invoiceData?.additinalCharges?.value !== 0 && (
                      <TableRow className="border-none">
                        <TableCell className="border-l"></TableCell>
                        <TableCell className=" w-[180px] pl-6 text-right relative leading-none">
                          <p className="absolute right-2 top-0 leading-none ">
                            {invoiceData?.additinalCharges?.label}
                          </p>
                        </TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none">
                          {invoiceData?.additinalCharges?.value &&
                            Number(
                              invoiceData?.additinalCharges?.value
                            )?.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )}

                    {/* --------------Discount--------------- */}
                    {invoiceData?.discount?.value !== 0 && (
                      <TableRow className="border-none">
                        <TableCell className="border-l"></TableCell>
                        <TableCell className=" w-[180px] pl-6 text-right relative leading-none">
                          <p className="absolute right-2 top-0 leading-none ">
                            {invoiceData?.discount?.label}
                          </p>
                        </TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none">
                          -
                          {invoiceData?.discount?.value &&
                            Number(invoiceData?.discount?.value)?.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )}

                    {/* --------------CGST-SGST-IGST--------------- */}
                    {invoiceData?.invoiceType === "state" ? (
                      <>
                        {/* --------------CGST--------------- */}
                        <TableRow className="border-none">
                          <TableCell className="border-l"></TableCell>
                          <TableCell className=" w-[180px] pl-6 text-right relative leading-none">
                            <p className="absolute right-2 top-0 leading-none ">
                              OUTPUT CGST
                            </p>
                          </TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none">
                            {invoiceData?.taxableAmount &&
                              (invoiceData?.taxableAmount * 0.09)?.toFixed(2)}
                          </TableCell>
                        </TableRow>

                        {/* --------------SGST--------------- */}
                        <TableRow className="border-none">
                          <TableCell className="border-l leading-none "></TableCell>
                          <TableCell className=" w-[180px] pl-6 text-right relative leading-none">
                            <p className="absolute right-2 top-0 leading-none">
                              OUTPUT SGST
                            </p>
                          </TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none"></TableCell>
                          <TableCell className="leading-none">
                            {invoiceData?.taxableAmount &&
                              (invoiceData?.taxableAmount * 0.09)?.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <TableRow className="border-none">
                        <TableCell className="border-l leading-none"></TableCell>
                        <TableCell className=" w-[180px] pl-6 text-right relative leading-none">
                          <p className="absolute right-2 top-0 leading-none">
                            OUTPUT IGST
                          </p>
                        </TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none"></TableCell>
                        <TableCell className="leading-none">
                          {invoiceData?.taxableAmount &&
                            (invoiceData?.taxableAmount * 0.18)?.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )}

                    {/* --------------Empty Row--------------- */}
                    {rows?.map((r) => (
                      <TableRow className="" key={r}>
                        <TableCell className="border-l h-6"></TableCell>
                        <TableCell className=" w-[180px] text-right font-bold"></TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=""></TableCell>
                        <TableCell className=" font-bold"></TableCell>
                      </TableRow>
                    ))}

                    {/* --------------Total--------------- */}
                    <TableRow className="">
                      <TableCell className="border-l border-t"></TableCell>
                      <TableCell className=" w-[180px] border-t text-right font-bold">
                        Total
                      </TableCell>
                      <TableCell className="border-t"></TableCell>
                      <TableCell className="border-t"></TableCell>
                      <TableCell className="border-t"></TableCell>
                      <TableCell className="border-t"></TableCell>
                      <TableCell className="border-t font-bold">
                        {invoiceData?.taxableAmount &&
                          (
                            invoiceData?.taxableAmount +
                            invoiceData?.taxableAmount * 0.18
                          )?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="px-3">
                <div className="flex justify-between">
                  <div>Amount Chargable (in Words)</div>
                  <div>E. & O.E</div>
                </div>
                <div className="font-bold ">
                  INR{" "}
                  {invoiceData?.taxableAmount &&
                    toWords.convert(
                      invoiceData?.taxableAmount +
                        invoiceData?.taxableAmount * 0.18,
                      {
                        currency: true,
                      }
                    )}
                </div>
              </div>

              <div className="">
                <Table>
                  <TableHeader>
                    <TableRow className="border-t border-black leading-none">
                      <TableCell className="w-[180px] font-bold text-center">
                        HSN/SAS
                      </TableCell>
                      <TableCell className="w-28 font-bold text-center">
                        <div>Taxable</div>
                        <div>Value</div>
                      </TableCell>

                      {invoiceData?.invoiceType === "state" ? (
                        <>
                          <TableCell className="w-32 font-bold text-center p-0">
                            <div className="border-b border-black">
                              State Tax
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="px-2  border-black border-r">
                                Rate
                              </div>
                              <div className="pr-2">Amount</div>
                            </div>
                          </TableCell>
                          <TableCell className="w-32 font-bold text-center p-0">
                            <div className="border-b border-black">
                              Central Tax
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="px-2  border-black border-r">
                                Rate
                              </div>
                              <div className="pr-2">Amount</div>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <TableCell className="w-32 font-bold text-center p-0">
                          <div className="border-b border-black">
                            Central Tax
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="px-3  border-black border-r">
                              Rate
                            </div>
                            <div className="pr-2">Amount</div>
                          </div>
                        </TableCell>
                      )}

                      <TableCell className="w-24 font-bold text-center">
                        Total Tax Amount
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="border-b border-black">
                    <TableRow>
                      <TableCell className=" w-[180px] border-t text-right leading-none"></TableCell>

                      <TableCell className="border-t text-center leading-none ">
                        {invoiceData?.taxableAmount?.toFixed(2)}
                      </TableCell>

                      {invoiceData?.invoiceType === "state" ? (
                        <>
                          <TableCell className="w-32  text-center p-0 leading-none">
                            <div className="flex justify-between items-center leading-none">
                              <div className="px-3 border-black border-r leading-none">
                                9%
                              </div>
                              <div className="pr-2 leading-none">
                                {invoiceData?.taxableAmount &&
                                  (invoiceData?.taxableAmount * 0.09).toFixed(
                                    2
                                  )}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="w-32  text-center p-0 leading-none">
                            <div className="flex justify-between items-center leading-none">
                              <div className="px-3 border-black border-r leading-none">
                                9%
                              </div>
                              <div className="pr-2 leading-none">
                                {invoiceData?.taxableAmount &&
                                  (invoiceData?.taxableAmount * 0.09).toFixed(
                                    2
                                  )}
                              </div>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <TableCell className="w-32  text-center p-0 leading-none">
                          <div className="flex justify-between items-center leading-none">
                            <div className="px-3 border-black border-r leading-none">
                              18%
                            </div>
                            <div className="pr-2 leading-none">
                              {invoiceData?.taxableAmount &&
                                (invoiceData?.taxableAmount * 0.18).toFixed(2)}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      <TableCell className="border-t  text-center leading-none ">
                        {invoiceData?.taxableAmount &&
                          (invoiceData?.taxableAmount * 0.18).toFixed(2)}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className=" w-[180px] border-t  font-bold text-center leading-none">
                        Total
                      </TableCell>

                      <TableCell className="border-t text-center leading-none  font-bold">
                        {invoiceData?.taxableAmount?.toFixed(2)}
                      </TableCell>

                      {invoiceData?.invoiceType === "state" ? (
                        <>
                          <TableCell className="w-32  text-center p-0 leading-none  border-t border-black">
                            <div className="flex justify-between items-center leading-none">
                              <div className="px-3 border-black border-r leading-none font-bold ">
                                9%
                              </div>
                              <div className="pr-2 leading-none font-bold ">
                                {invoiceData?.taxableAmount &&
                                  (invoiceData?.taxableAmount * 0.09).toFixed(
                                    2
                                  )}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="w-32  text-center p-0 leading-none  border-t border-black">
                            <div className="flex justify-between items-center leading-none">
                              <div className="px-3 border-black border-r leading-none font-bold ">
                                9%
                              </div>
                              <div className="pr-2 leading-none font-bold ">
                                {invoiceData?.taxableAmount &&
                                  (invoiceData?.taxableAmount * 0.09).toFixed(
                                    2
                                  )}
                              </div>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <TableCell className="w-32  text-center p-0 leading-none border-t border-black">
                          <div className="flex justify-between items-center leading-none">
                            <div className="px-3 border-black border-r leading-none font-bold ">
                              18%
                            </div>
                            <div className="pr-2 leading-none font-bold ">
                              {invoiceData?.taxableAmount &&
                                (invoiceData?.taxableAmount * 0.18).toFixed(2)}
                            </div>
                          </div>
                        </TableCell>
                      )}

                      <TableCell className="border-t font-bold text-center leading-none  ">
                        {invoiceData?.taxableAmount &&
                          (invoiceData?.taxableAmount * 0.18).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="px-3">
                <div className="">Tax Amount (in Words)</div>
                <div className="font-bold leading-none">
                  INR{" "}
                  {invoiceData?.taxableAmount &&
                    toWords.convert(invoiceData?.taxableAmount * 0.18, {
                      currency: true,
                    })}
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 flex flex-col justify-end">
                  <div>
                    Company&rsquo;s PAN :
                    <span className="font-bold">{company?.panNumber}</span>
                  </div>
                </div>
                <div className="py-1">
                  <div>Company&rsquo;s Bank Details</div>
                  <div className="py-[2px] leading-none">
                    Bank Name
                    <span className="font-bold leading-none">
                      : {company?.bankName}
                    </span>
                  </div>
                  <div className="leading-none py-[2px]">
                    A/C Number
                    <span className="font-bold leading-none">
                      : {company?.accountNumber}{" "}
                    </span>
                  </div>
                  <div className="leading-none py-[2px]">
                    Branch & IFSC{" "}
                    <span className="font-bold leading-none">
                      : {company?.bankBranch} {company?.ifscCode}
                    </span>
                  </div>
                </div>
                <div className="px-4">
                  <div className="underline">Declaration</div>
                  <div className="leading-none">{company?.declaration}</div>
                </div>
                <div className="border-t border-l border-black">
                  <div className="">
                    <div className="">For {company?.name}</div>
                    <div className="text-center mt-10">
                      Authorised Signatory
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center leading-none">
            SUBJECT TO BANGALORE JURISDICTION
          </div>
          <div className="text-center">
            This is a computer Generated Invoice
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicInvoiceTemplate;
