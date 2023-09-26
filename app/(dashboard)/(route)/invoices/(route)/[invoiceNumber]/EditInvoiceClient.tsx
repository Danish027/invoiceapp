"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useCallback, useEffect, useState } from "react";
import { BsBuildingDown, BsBuildingUp, BsCardList } from "react-icons/bs";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdDelete, MdDeleteOutline, MdEdit } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";
import { Label } from "@/components/ui/label";
import useCompany from "@/actions/useCompany";
import {
  Company,
  Customer,
  ExtraFields,
  Invoice,
  Products,
} from "@/schema/type";
import useCustomers from "@/actions/useCustomers";
import { CustomerSelect } from "@/components/customeUI/dashboardUI/SelectCustomer";
import SelectProduts2 from "@/components/customeUI/dashboardUI/SelectProducts2";
import useProducts from "@/actions/useProducts";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parse, parseISO } from "date-fns";
import { cn } from "@/libs/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BiArrowBack, BiDownload } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import useInvoices, { useInvoice } from "@/actions/useInvoices";
import { ToastAction } from "@radix-ui/react-toast";
import Link from "next/link";
import { fetchData } from "next-auth/client/_utils";

type Item = {
  id: number;
  description: string;
  invoiceId: number;
  hsncode: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}[];
const emptyItemField = {
  invoiceId: 0,
  id: 0,
  description: "",
  hsncode: "",
  quantity: 0,
  unit: "",
  rate: 0,
  amount: 0,
};

const EditInvoiceClient = ({ invoiceNumber }: { invoiceNumber: string }) => {
  const { data: company, mutate: companyMutate } = useCompany();
  const companyData: Company = company;
  const [loading, setLoading] = useState(false);

  const { mutate: invoiceMutate } = useInvoices();
  const { data: currentInvoice } = useInvoice(invoiceNumber);

  const [fetchedInvoice, setFetchedInvoice] = useState<Invoice>(currentInvoice);
  const { data: customers, mutate } = useCustomers();
  const customersList: Array<Customer> = customers;
  const { data: products } = useProducts();
  const productsList: Array<Products> = products;
  const [items, setItems] = useState<Item>(fetchedInvoice?.items);
  const [taxableAmount, setTaxableAmount] = useState(0);
  const [discount, setDiscount] = useState<ExtraFields>({
    label: "Discount",
    value: 0,
  });

  const [additinalCharges, setAdditinalCharges] = useState<ExtraFields>({
    label: "Additinal Charges",
    value: 0,
  });

  const [optionalField, setOptionalField] = useState<ExtraFields>({
    label: "",
    value: 0,
  });

  const handleDiscountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiscount((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setDiscount]
  );

  const handleAdditionalChargesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAdditinalCharges((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setAdditinalCharges]
  );

  const handleOptionalFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOptionalField((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setOptionalField]
  );

  useEffect(() => {
    setFetchedInvoice(currentInvoice);
    setItems(fetchedInvoice?.items);
    setInvoiceData((prevState: any) => ({
      ...prevState,
      id: fetchedInvoice?.id,
      date: currentInvoice?.date,
      invoiceNumber: fetchedInvoice?.invoiceNumber,
      invoiceType: fetchedInvoice?.invoiceType,
      vehicleNumber: fetchedInvoice?.vehicleNumber,
      additinalCharges: fetchedInvoice?.additinalCharges,
      discount: fetchedInvoice?.discount,
      taxableAmount: fetchedInvoice?.taxableAmount,
      paymentStatus: fetchedInvoice?.paymentStatus,
    }));
    setInvoiceCustomer(fetchedInvoice?.customerId);
    setAdditinalCharges({
      label: fetchedInvoice?.additinalCharges?.label,
      value: fetchedInvoice?.additinalCharges?.value,
    });
    setDiscount({
      label: fetchedInvoice?.discount?.label,
      value: fetchedInvoice?.discount?.value,
    });
    setOptionalField({
      label: fetchedInvoice?.optionalField?.label,
      value: fetchedInvoice?.optionalField?.value,
    });
  }, [companyData, currentInvoice, fetchedInvoice]);

  useEffect(() => {
    // Calculate the taxable amount based on the items
    const updatedTaxableAmount = items?.reduce(
      (total, item) => total + item.amount,
      0
    );
    setTaxableAmount(updatedTaxableAmount);

    // Update the taxableAmount field in invoiceData
    setInvoiceData((prevState: any) => ({
      ...prevState,
      taxableAmount: updatedTaxableAmount,
    }));
  }, [items]);
  useEffect(() => {
    // Calculate the taxable amount based on the items
    if (discount.value || additinalCharges.value) {
      const updatedTaxableAmount =
        items?.reduce((total, item) => total + item.amount, 0) -
        Number(discount?.value) +
        Number(additinalCharges?.value);

      setTaxableAmount(updatedTaxableAmount);

      // Update the taxableAmount field in invoiceData
      setInvoiceData((prevState: any) => ({
        ...prevState,
        taxableAmount: updatedTaxableAmount,
      }));
    }
  }, [items, discount.value, additinalCharges.value]);

  // ----------------------------Date format--------------------------------------------------------
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
  const fetchedDate: Date = fetchedInvoice?.date;
  let newDate = "Date";
  if (fetchedDate !== undefined) {
    newDate = fetchedDate.toString();
  }
  const selectedPart = formatDateString(newDate.slice(0, 10));

  const [invoiceData, setInvoiceData] = useState({
    id: fetchedInvoice?.id,
    invoiceNumber: fetchedInvoice?.invoiceNumber,
    invoiceType: fetchedInvoice?.invoiceType,
    date: fetchedInvoice?.date,
    vehicleNumber: fetchedInvoice?.vehicleNumber,
    additinalCharges: fetchedInvoice?.additinalCharges,
    discount: fetchedInvoice?.discount,
    taxableAmount: fetchedInvoice?.taxableAmount,
    paymentStatus: fetchedInvoice?.paymentStatus,
    optionalField: fetchedInvoice?.optionalField,
  });

  const [invoiceCustomer, setInvoiceCustomer] = useState<number>(
    fetchedInvoice?.customerId
  );
  const [date, setDate] = React.useState<Date>();

  useEffect(() => {
    setInvoiceData((prevState: any) => ({
      ...prevState,
      date: date,
    }));
  }, [date]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const { name, value } = e.target;
      let parsedValue: any = value;
      if (name === "quantity" || name === "rate") {
        parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          parsedValue = 0;
        }
      }

      const updatedInvoice = items.map((item, i) =>
        index === i
          ? {
              ...item,
              [name]: parsedValue,
              amount:
                (name === "quantity" ? parsedValue : item.quantity) *
                (name === "rate" ? parsedValue : item.rate),
            }
          : item
      );

      setItems(updatedInvoice);

      const updatedTaxableAmount = updatedInvoice.reduce(
        (total, item) => total + item.amount,
        0
      );
      setTaxableAmount(updatedTaxableAmount);

      setInvoiceData((prevState: any) => ({
        ...prevState,
        taxableAmount: updatedTaxableAmount,
      }));
    },
    [items]
  );
  const addItem = () => {
    setItems([...items, emptyItemField]);
  };

  const handleSelect = (value: string, id: number, index: number) => {
    const objIndex = productsList.findIndex((obj) => obj.id === id);
    const updatedInvoice = items?.map((item, i) =>
      index === i
        ? {
            ...item,
            description: productsList[objIndex]?.description,
            hsncode: productsList[objIndex]?.hnsCode,
            quantity: productsList[objIndex]?.quantity,
            unit: productsList[objIndex]?.unit,
            rate: productsList[objIndex]?.rate,
            amount:
              //@ts-ignore
              productsList[objIndex]?.quantity * productsList[objIndex]?.rate,
          }
        : item
    );
    const updatedTaxableAmount = updatedInvoice.reduce(
      (total, item) => total + item.amount,
      0
    );
    setTaxableAmount(updatedTaxableAmount);
    //@ts-ignore
    setItems(updatedInvoice);
  };

  const deleteItem = useCallback(
    (index: number) => {
      const updatedInvoices = [...items];
      updatedInvoices.splice(index, 1);
      setItems(updatedInvoices);
    },
    [setItems, items]
  );
  const handleCustomerChange = useCallback(
    (id: number) => {
      setInvoiceCustomer(id);
      const currentCustomer = customersList.filter(
        (customer) => customer.id === id
      );
      const customergstin = currentCustomer[0]?.gstin.substring(0, 2);
      const companygstin = companyData?.gstin.substring(0, 2);

      if (customergstin === companygstin) {
        setInvoiceData((prevState: any) => ({
          ...prevState,
          invoiceType: "state",
        }));
      } else {
        setInvoiceData((prevState: any) => ({
          ...prevState,
          invoiceType: "centeral",
        }));
      }
    },
    [customersList, companyData]
  );

  const handleInvoiceChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setInvoiceData((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setInvoiceData]
  );

  const handleSubmit = useCallback(async () => {
    try {
      const updatedItems = items.map((item) => {
        const { id, invoiceId, ...rest } = item;
        return rest;
      });

      const responce = await axios.put(
        `/api/invoices/${invoiceData?.invoiceNumber}`,
        {
          invoiceData: invoiceData,
          customerId: invoiceCustomer,
          items: updatedItems,
        }
      );
      invoiceMutate();
      toast({
        description: "Invoice Updated Successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [invoiceCustomer, items, invoiceData, invoiceMutate]);

  // ---------------------Discount handeling---------------------------

  const handleDiscountSubmit = useCallback(() => {
    setInvoiceData((prevState: any) => ({
      ...prevState,
      discount: discount,
    }));
  }, [discount]);

  const handleAdditinalCharges = useCallback(() => {
    setInvoiceData((prevState: any) => ({
      ...prevState,
      additinalCharges: additinalCharges,
    }));
  }, [additinalCharges]);

  const handleOptionalField = useCallback(() => {
    setInvoiceData((prevState: any) => ({
      ...prevState,
      optionalField: optionalField,
    }));
  }, [optionalField]);

  const discountBody = (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="ml-2">Label</Label>
        <Input
          placeholder="Enter the label"
          name="label"
          onChange={handleDiscountChange}
          value={discount.label}
        />
      </div>
      <div>
        <Label className="ml-2">Amount</Label>
        <Input
          placeholder="Enter the amount.."
          value={discount.value}
          name="value"
          onChange={handleDiscountChange}
        />
      </div>
    </div>
  );

  const additionalChargesBody = (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="ml-2">Label</Label>
        <Input
          placeholder="Enter the label"
          name="label"
          onChange={handleAdditionalChargesChange}
          value={additinalCharges.label}
        />
      </div>
      <div>
        <Label className="ml-2">Amount</Label>
        <Input
          placeholder="Enter the amount.."
          value={additinalCharges.value}
          name="value"
          onChange={handleAdditionalChargesChange}
        />
      </div>
    </div>
  );

  const optionalFieldBody = (
    <div className="flex flex-col gap-2">
      <div>
        <Label className="ml-2">Label</Label>
        <Input
          placeholder="Enter the label"
          name="label"
          onChange={handleOptionalFieldChange}
          value={optionalField.label}
        />
      </div>
      <div>
        <Label className="ml-2">Value</Label>
        <Input
          placeholder="Enter the value.."
          value={optionalField.value}
          name="value"
          onChange={handleOptionalFieldChange}
        />
      </div>
    </div>
  );
  useEffect(() => {
    if (
      fetchedInvoice === undefined ||
      customers === undefined ||
      company === undefined
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [company, customers, fetchedInvoice]);
  if (loading === true) {
    return (
      <div className="flex w-full h-screen justify-center items-center flex-col">
        <div className="text-xl">Data fetching in process</div>
        <div>Please wait....</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto xl:px-30 max-w-6xl border-2 p-3">
      <div className="flex justify-between">
        <Link href="/invoices">
          <Button className="text-lg" variant="link">
            <BiArrowBack className="mr-2" /> Back
          </Button>
        </Link>

        <div className="text-center text-md sm:text-xl">TAX INVOICE</div>
        <div className="flex justify-between gap-2">
          <Button
            className="h-8"
            variant="default"
            onClick={handleSubmit}
            type="submit"
          >
            Save <FaSave className="ml-3" />
          </Button>
          <Link href={`/invoices/download/${invoiceNumber}`}>
            <Button variant={"ghost"} className="p-2 mr-0">
              <BiDownload size={20} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center sm:justify-between p-3 flex-col md:flex-row gap-4 ">
        <div className="flex flex-col gap-6">
          <Card className="w-[300px] md:w-[400px]">
            <CardContent className="p-4">
              <div>
                <p className="ml-2 mb-0 flex gap-2">
                  <BsBuildingUp /> Bill From
                </p>
                <Input value={companyData?.name.toUpperCase()} disabled />
              </div>
            </CardContent>
          </Card>

          <Card className="w-[300px] md:w-[400px]">
            <CardContent className="p-4">
              <div>
                <p className="ml-2 mb-0 flex gap-2">
                  <BsBuildingDown /> Bill To
                </p>
                <CustomerSelect
                  customerList={customersList}
                  onChange={handleCustomerChange}
                  mutate={mutate}
                  customerId={invoiceCustomer}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ----------------Invoice Section------------------ */}

        <div>
          <Card className="w-[300px] md:w-[400px] p-4">
            <p className="mb-1 flex gap-2">
              <LiaFileInvoiceSolid size={20} /> Invoice Details
            </p>
            <Separator className="my-2" />
            <CardContent className="grid grid-cols-3 gap-1 p-0">
              <p className="pt-2">Invoice No.</p>
              <Input
                className="col-span-2"
                disabled
                value={invoiceData.invoiceNumber}
              />
              {/* ----------------Calender Section------------------ */}

              <p className="pt-2">Date</p>
              <div className="col-span-2 ">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-between text-left font-normal  p-2 ",
                        !date && "text-muted-foreground"
                      )}
                      name="date"
                    >
                      {date ? (
                        format(date, "dd-MMM-yyyy")
                      ) : (
                        <span className="text-[14px] text-foreground">
                          {selectedPart}
                        </span>
                      )}
                      <CalendarIcon className="mr-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <p className="pt-2">Vehicle No.</p>
              <Input
                className="col-span-2"
                onChange={handleInvoiceChange}
                name="vehicleNumber"
                value={invoiceData.vehicleNumber}
              />
              {optionalField?.value !== 0 ||
              fetchedInvoice?.optionalField === undefined ||
              fetchedInvoice?.optionalField === null ? (
                <>
                  <p className="pt-2">{optionalField?.label}</p>
                  <div className="col-span-2 flex  items-center">
                    <Input className="" value={optionalField?.value} disabled />

                    <AlertDialog
                      icon={MdEdit}
                      onClick={handleOptionalField}
                      submitlabel="Add"
                      buttonSecondaryLabel="Cancel"
                      ghost
                      body={optionalFieldBody}
                      title="Optional Field"
                    />
                    <AlertDialog
                      icon={MdDelete}
                      onClick={() => {
                        setOptionalField({ value: 0, label: "" });
                        setInvoiceData((prevState: any) => ({
                          ...prevState,
                          optionalField: { value: 0, label: "" },
                        }));
                      }}
                      title="Are you sure you want to delete?"
                      description="Once you have deleted this, it won't  be available"
                      submitlabel="Delete"
                      buttonSecondaryLabel="Cancel"
                      ghost
                    />
                  </div>
                </>
              ) : (
                <div className="mt-2 col-span-3 ">
                  <AlertDialog
                    icon={AiOutlinePlus}
                    onClick={handleOptionalField}
                    buttonLabel="Add Field"
                    submitlabel="Add"
                    buttonSecondaryLabel="Cancel"
                    outline
                    body={optionalFieldBody}
                    title="Discount"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="p-3 ">
        <div className="flex gap-2 ml-2 mb-2">
          <BsCardList size={20} /> Products
        </div>

        {/* ----------------table Section------------------ */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sl No.</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-center">HSN Code</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Unit</TableHead>
                <TableHead className="text-center">Rate</TableHead>
                <TableHead className="text-center">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell width={60} className="text-center">
                    <Input value={index + 1} disabled className="text-center" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-0 relative min-w-[300px]">
                      <Input
                        className=""
                        name="description"
                        onChange={(e) => handleChange(e, index)}
                        value={item.description}
                        placeholder="Select Item"
                      />
                      <div className="absolute right-0 top-0">
                        <SelectProduts2
                          item={item}
                          dataList={productsList}
                          placeholder="Select Item"
                          index={index}
                          onSelect={handleSelect}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell width={120}>
                    <Input
                      className="min-w-[100px]"
                      placeholder="HSN Code "
                      name="hsncode"
                      value={item.hsncode}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell width={101}>
                    <Input
                      placeholder="Quantity"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                    />
                  </TableCell>
                  <TableCell width={70}>
                    <Input
                      className="min-w-[50px] text-center"
                      placeholder="Unit"
                      name="unit"
                      value={item.unit}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell width={101}>
                    <Input
                      className="min-w-[100px]"
                      placeholder="Rate"
                      name="rate"
                      value={item.rate}
                      onChange={(e) => {
                        handleChange(e, index);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addItem();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell width={120}>
                    <Input
                      className="min-w-[100px]"
                      value={item?.amount?.toFixed(2)}
                      disabled
                    />
                  </TableCell>
                  <TableCell width={8}>
                    <Button
                      className="px-2"
                      autoFocus={false}
                      variant={"ghost"}
                      onClick={() => deleteItem(index)}
                    >
                      <MdDeleteOutline />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="w-full mt-4" variant={"outline"} onClick={addItem}>
            Add Item +
          </Button>
        </Card>
        {/* ----------------Summary Section------------------ */}

        <div className="mt-7 flex justify-end">
          <Card className="w-[300px] md:w-[400px] p-4">
            <p className="mb-1 flex gap-2">
              <HiOutlineCurrencyRupee size={20} /> Summary
            </p>
            <Separator className="my-2" />
            <div className="mt-2">
              {additinalCharges?.value !== 0 ? (
                <div className="flex gap-2">
                  <div className=" w-[140px]">{additinalCharges?.label}</div>
                  <div className="flex">
                    <div className="">
                      <Input
                        value={Number(additinalCharges?.value)?.toFixed(2)}
                        disabled
                      />
                    </div>
                    <AlertDialog
                      icon={MdEdit}
                      onClick={handleAdditinalCharges}
                      submitlabel="Add"
                      buttonSecondaryLabel="Cancel"
                      ghost
                      body={additionalChargesBody}
                      title="Additional Charges"
                    />
                    <AlertDialog
                      icon={MdDelete}
                      onClick={() => {
                        setAdditinalCharges({ value: 0, label: "" });
                        setInvoiceData((prevState: any) => ({
                          ...prevState,
                          additinalCharges: { value: 0, label: "" },
                        }));
                      }}
                      title="Are you sure you want to delete?"
                      description="Once you have deleted this, it won't  be available"
                      submitlabel="Delete"
                      buttonSecondaryLabel="Cancel"
                      ghost
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-2 col-span-3 ">
                  <AlertDialog
                    icon={AiOutlinePlus}
                    onClick={handleAdditinalCharges}
                    buttonLabel="Additional Charges"
                    submitlabel="Add"
                    buttonSecondaryLabel="Cancel"
                    outline
                    body={additionalChargesBody}
                    title="Additonal Charge"
                  />
                </div>
              )}

              {discount?.value !== 0 ? (
                <div className="flex gap-2">
                  <p className="pt-2 w-[140px]">{discount?.label}</p>
                  <div className="flex">
                    <Input
                      value={Number(discount?.value).toFixed(2)}
                      disabled
                    />
                    <AlertDialog
                      icon={MdEdit}
                      onClick={handleDiscountSubmit}
                      submitlabel="Add"
                      buttonSecondaryLabel="Cancel"
                      ghost
                      body={discountBody}
                      title="Discount"
                    />
                    <AlertDialog
                      icon={MdDelete}
                      onClick={() => {
                        setDiscount({ value: 0, label: "" });
                        setInvoiceData((prevState: any) => ({
                          ...prevState,
                          discount: { value: 0, label: "" },
                        }));
                      }}
                      title="Are you sure you want to delete?"
                      description="Once you have deleted this, it won't  be available"
                      submitlabel="Delete"
                      buttonSecondaryLabel="Cancel"
                      ghost
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-2 col-span-3 ">
                  <AlertDialog
                    icon={AiOutlinePlus}
                    onClick={handleDiscountSubmit}
                    buttonLabel="Discount"
                    submitlabel="Add"
                    buttonSecondaryLabel="Cancel"
                    outline
                    body={discountBody}
                    title="Discount"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1 mt-2">
              <p className="pt-2">Taxable Amount</p>
              <Input
                className="col-span-2"
                disabled
                value={taxableAmount?.toFixed(2)}
              />
              {invoiceData.invoiceType === "state" ? (
                <>
                  <p className="pt-2">CGST-9%</p>
                  <Input
                    className="col-span-2"
                    disabled
                    value={(taxableAmount * 0.09)?.toFixed(2)}
                  />
                  <p className="pt-2">SGST-9%</p>
                  <Input
                    className="col-span-2"
                    disabled
                    value={(taxableAmount * 0.09)?.toFixed(2)}
                  />
                </>
              ) : (
                <>
                  <p className="pt-2">IGST-18%</p>
                  <Input
                    className="col-span-2"
                    disabled
                    value={(taxableAmount * 0.18)?.toFixed(2)}
                  />
                </>
              )}
              <p className="pt-2">Total Amount</p>
              <Input
                disabled
                className="col-span-2"
                value={(taxableAmount + taxableAmount * 0.18)?.toFixed(2)}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditInvoiceClient;
