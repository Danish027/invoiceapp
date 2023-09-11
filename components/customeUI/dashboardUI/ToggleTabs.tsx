"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiAlertOctagon } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useCallback, useEffect, useState } from "react";
import { LuVerified } from "react-icons/lu";
import { Company, SafeUser } from "@/schema/type";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import useCompany from "@/actions/useCompany";
import { useUser } from "@clerk/nextjs";

const companyEmptyFields = {
  id: 0,
  userId: 0,
  name: "",
  email: "",
  mobileNumber: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  gstin: "",
  panNumber: "",
  declaration:
    "We Declare that this invoice shows the actual price of the goods described and that all particulars are true and correct",
  note: "We Declare that this invoice shows the actual price of the goods described and that all particulars are true and correct",
  bankName: "",
  accountNumber: "",
  bankBranch: "",
  ifscCode: "",
  currentInvoiceNumber: 0,
  currentEstimateNumber: 0,
  invoiceFormat: "classic",
};
export function ToggleTabs() {
  const { user } = useUser();
  const { data: companyData, mutate } = useCompany();
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);

  useEffect(() => {
    if (companyData !== null) {
      setCompanyDetails(companyData);
    } else {
      setCompanyDetails(companyEmptyFields);
    }
  }, [companyData]);

  const { toast } = useToast();

  const handleChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setCompanyDetails((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setCompanyDetails]
  );

  const handleSubmit = async () => {
    try {
      const name = companyDetails?.name;
      const email = companyDetails?.email;
      const addressLine1 = companyDetails?.addressLine1;
      const accountNumber = companyDetails?.accountNumber;
      const addressLine2 = companyDetails?.addressLine2;
      const bankBranch = companyDetails?.bankBranch;
      const bankName = companyDetails?.bankName;
      const declaration = companyDetails?.declaration;
      const gstin = companyDetails?.gstin;
      const ifscCode = companyDetails?.ifscCode;
      const mobileNumber = companyDetails?.mobileNumber;
      const note = companyDetails?.note;
      const panNumber = companyDetails?.panNumber;
      const state = companyDetails?.state;
      const currentInvoiceNumber = companyDetails?.currentInvoiceNumber;
      const currentEstimateNumber = companyDetails?.currentEstimateNumber;
      const invoiceFormat = companyDetails?.invoiceFormat;

      if (companyData !== null) {
        await axios.put("/api/company", {
          name,
          email,
          addressLine1,
          addressLine2,
          declaration,
          gstin,
          mobileNumber,
          note,
          panNumber,
          state,
          bankName,
          accountNumber,
          bankBranch,
          ifscCode,
          currentInvoiceNumber,
          currentEstimateNumber,
          invoiceFormat,
        });
        toast({
          description: "Changes Saved",
        });
      } else {
        await axios.post("/api/company", {
          name,
          email,
          addressLine1,
          addressLine2,
          declaration,
          gstin,
          mobileNumber,
          note,
          panNumber,
          state,
          bankName,
          accountNumber,
          bankBranch,
          ifscCode,
          currentInvoiceNumber,
          currentEstimateNumber,
          invoiceFormat,
        });
        toast({
          description: "Changes Saved",
        });
      }
      mutate();
    } catch (error: any) {
      toast({
        description: "Something went wrong!!!",
      });
    }
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="personal">
          Personal Details
          {true === true ? (
            <LuVerified color="#22c55e" size={19} className="ml-2" />
          ) : (
            <FiAlertOctagon color="#facc15" size={16} className="ml-2" />
          )}
        </TabsTrigger>
        <TabsTrigger value="company">
          Company Details
          {true === true ? (
            <LuVerified color="#22c55e" size={19} className="ml-2" />
          ) : (
            <FiAlertOctagon color="#facc15" size={16} className="ml-2" />
          )}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>
              This is your personal details. please note that personal details
              can be edited.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <Label className="ml-2">Full Name</Label>
              <Input disabled value={user?.fullName ? user?.fullName : "N/A"} />
            </div>
            <div>
              <Label className="ml-2">Email</Label>
              <Input
                disabled
                value={
                  user?.fullName ? user?.emailAddresses[0]?.emailAddress : "N/A"
                }
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button variant="outline" disabled>
              Edit
            </Button>
            <Button className="h-8" disabled>
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="company">
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>
              Please enter/edit your companies details. Click save when youre
              done..
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="ml-2">Current Invoice No.</Label>
                <Input
                  placeholder="e.g. INV014"
                  name="currentInvoiceNumber"
                  onChange={handleChange}
                  value={companyDetails?.currentInvoiceNumber}
                />
              </div>
              <div>
                <Label className="ml-2"> Current Estimate No.</Label>
                <Input
                  placeholder="e.g. E1002"
                  name="currentEstimateNumber"
                  onChange={handleChange}
                  value={companyDetails?.currentEstimateNumber}
                />
              </div>
              <div>
                <Label className="ml-2">Invoice Format</Label>

                <Select
                  value={companyDetails?.invoiceFormat}
                  onValueChange={(e) => {
                    setCompanyDetails((prevState: any) => ({
                      ...prevState,
                      invoiceFormat: e,
                    }));
                  }}
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select Invoice Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Formats</SelectLabel>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="ml-2">Company Name</Label>
              <Input
                placeholder="e.g. XYZ Corporaion Limited"
                name="name"
                onChange={handleChange}
                value={companyDetails?.name}
              />
            </div>
            <div>
              <Label className="ml-2">Company Email</Label>
              <Input
                placeholder="e.g. abc@gmail.com"
                name="email"
                onChange={handleChange}
                value={companyDetails?.email}
              />
            </div>
            <div>
              <Label className="ml-2">Company Mobile Number</Label>
              <Input
                placeholder="e.g. +91-2212345678"
                name="mobileNumber"
                onChange={handleChange}
                value={companyDetails?.mobileNumber}
              />
            </div>
            <div>
              <Label className="ml-2">Address Line 1</Label>
              <Input
                placeholder="e.g. 123 Main Street, apt 4B Bangalore , 91911"
                name="addressLine1"
                onChange={handleChange}
                value={companyDetails?.addressLine1}
              />
            </div>
            <div>
              <Label className="ml-2">Address Line 2</Label>
              <Input
                placeholder="e.g.  4B Bangalore, 560XXX"
                name="addressLine2"
                onChange={handleChange}
                value={companyDetails?.addressLine2}
              />
            </div>
            <div>
              <Label className="ml-2">State / Code </Label>
              <Input
                placeholder="e.g. Karnataka-29"
                name="state"
                onChange={handleChange}
                value={companyDetails?.state}
              />
            </div>
            <div>
              <Label className="ml-2">GSTIN/UIN</Label>
              <Input
                placeholder="e.g. 29AACCF8045D1ZM"
                name="gstin"
                onChange={handleChange}
                value={companyDetails?.gstin}
              />
            </div>
            <div>
              <Label className="ml-2">PAN Number</Label>
              <Input
                placeholder="e.g. AACCF8045D"
                name="panNumber"
                onChange={handleChange}
                value={companyDetails?.panNumber}
              />
            </div>
            <div>
              <Label className="ml-2">Declaration</Label>
              <Textarea
                onChange={handleChange}
                name="declaration"
                value={companyDetails?.declaration}
                className="resize-none bg-background"
              />
            </div>
            <div>
              <Label className="ml-2">Note</Label>
              <Textarea
                name="note"
                className="resize-none bg-background"
                value={companyDetails?.note}
                onChange={handleChange}
              />
            </div>
            <h1 className="ml-2 mt-3 text-xl">Bank Detials</h1>
            <Separator />
            <div>
              <Label className="ml-2">Bank Name</Label>
              <Input
                placeholder="e.g. Bank of India"
                name="bankName"
                value={companyDetails?.bankName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="ml-2">Account Number</Label>
              <Input
                placeholder="e.g. 67319948232"
                name="accountNumber"
                value={companyDetails?.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="ml-2">Bank Branch</Label>
              <Input
                placeholder="e.g. Bangalore"
                name="bankBranch"
                value={companyDetails?.bankBranch}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="ml-2">IFSC Code</Label>
              <Input
                placeholder="e.g. BOIB0070028"
                name="ifscCode"
                value={companyDetails?.ifscCode}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button variant="outline">Edit</Button>
            <Button className="h-8" onClick={handleSubmit}>
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
