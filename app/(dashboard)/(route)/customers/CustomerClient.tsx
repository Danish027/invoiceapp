"use client";
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/customeUI/mainPageUI/Header";
import { Input } from "@/components/ui/input";
import { BsCloudDownload } from "react-icons/bs";

import { AiOutlinePlus } from "react-icons/ai";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";

import CustomerCard from "@/components/customeUI/dashboardUI/CustomerCard";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import useCustomers from "@/actions/useCustomers";
import { Customer } from "@/schema/type";
import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";
import { downloadToExcelCustomer } from "@/libs/xlsx";

const emptyCustomer = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  gstin: "",
};

const CustomerClient = () => {
  const { data: fetchedCustomerData, mutate } = useCustomers();
  const [customers, setCustomers] = useState<Customer[]>(fetchedCustomerData);
  const [createCustomer, setCreateCustomer] = useState(emptyCustomer);
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(fetchedCustomerData);
  useEffect(() => {
    setCustomers(fetchedCustomerData);
    setFilteredCustomers(fetchedCustomerData); //
  }, [fetchedCustomerData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchValue)
    );
    setFilteredCustomers(filtered);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateCustomer((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setCreateCustomer]
  );

  const handleSubmit = useCallback(async () => {
    const { addressLine1, addressLine2, gstin, name, state } = createCustomer;
    try {
      await axios.post("/api/customers", {
        name,
        addressLine1,
        addressLine2,
        gstin,
        state,
      });
      toast({
        description: "Created Customer",
      });
      mutate();
    } catch (error: any) {
      toast({
        description: "Something went wrong!!!",
      });
    }
    setCreateCustomer(emptyCustomer);
  }, [createCustomer, mutate]);

  return (
    <div className="min-h-screen">
      <Header dashboard label="Customers" />
      <div className="p-4">
        <div className="flex items-center ">
          <div className="flex justify-between items-center flex-col-reverse gap-4 sm:flex-row w-full ">
            <Input
              className="w-full sm:w-2/3"
              placeholder="Type a command or search...."
              onChange={handleSearchChange} // Use handleSearchChange here
            />
            <div className="flex gap-3 items-center">
              <AlertDialog
                body={<div></div>}
                buttonLabel="Download"
                description="Are you sure you want to Downlaod!"
                submitlabel="Download"
                title="Download Dialog"
                buttonSecondaryLabel="Cancel"
                icon={BsCloudDownload}
                outline
                onClick={() => {
                  console.log(customers);
                  downloadToExcelCustomer(customers);
                }}
              />
              <AlertDialog
                icon={AiOutlinePlus}
                buttonLabel="Create"
                submitlabel="Create"
                primary
                onClick={handleSubmit}
                buttonSecondaryLabel="Cancel"
                body={
                  <div className="flex flex-col gap-2 w-full">
                    <div>
                      <Label className="pl-1">Customer Name</Label>
                      <Input
                        placeholder="e.g. Transport Corporation of India"
                        name="name"
                        value={createCustomer.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label className="pl-1">Address Line 1</Label>
                      <Input
                        name="addressLine1"
                        placeholder="e.g. Bidadi Industrial Area"
                        value={createCustomer.addressLine1}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="pl-1">Address Line 2</Label>
                      <Input
                        placeholder="e.g. Bangalore"
                        name="addressLine2"
                        value={createCustomer.addressLine2}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label className="pl-1">GSTIN No.</Label>
                      <Input
                        name="gstin"
                        placeholder="e.g. 29ASHW134532AS"
                        value={createCustomer.gstin}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="pl-1">State / Code</Label>
                      <Input
                        name="state"
                        placeholder="e.g. Karnataka-29"
                        value={createCustomer.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        {filteredCustomers?.length === 0 ? (
          <div className="w-full h-[70vh]">
            <EmptyState
              title="No Customers  found"
              subtitle="Looks like you have no customers."
            />
          </div>
        ) : (
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-5 ">
            {filteredCustomers?.map((customer) => (
              <div key={customer.id}>
                <CustomerCard customer={customer} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerClient;
