import useCustomers from "@/actions/useCustomers";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Customer } from "@/schema/type";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";

const CustomerCard = ({ customer }: { customer: Customer }) => {
  const { mutate } = useCustomers();
  const [showContent, setShowContent] = useState(false);
  const [editCustomer, setEditCustomer] = useState(customer);

  const handleMouseEnter = () => {
    setShowContent(true);
  };
  const handleMouseLeave = () => {
    setShowContent(false);
  };

  const handleChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setEditCustomer((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setEditCustomer]
  );

  const handleEdit = useCallback(async () => {
    const { addressLine1, addressLine2, gstin, name, state, id } = editCustomer;
    try {
      await axios.put("/api/customers", {
        name,
        addressLine1,
        addressLine2,
        gstin,
        state,
        id,
      });
      toast({
        description: "Changes Saved",
      });
      mutate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [editCustomer, mutate]);

  const handleDelete = useCallback(async () => {
    const { id } = editCustomer;
    try {
      await axios.delete(`/api/customers/${id}`);
      toast({
        description: "Customer Deleted",
      });
      mutate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [editCustomer, mutate]);

  return (
    <div>
      <Card
        className="font-light relative transition duration-300 "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showContent && (
          <div className="absolute bottom-0 right-2 p-1 flex gap-1 opacity-80 ">
            <AlertDialog
              icon={LuEdit}
              onClick={handleEdit}
              title="Edit Customer"
              submitlabel="Save changes"
              buttonSecondaryLabel="Cancel"
              ghost
              body={
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <Label className="pl-1">Company Name</Label>
                    <Input
                      value={editCustomer.name}
                      onChange={handleChange}
                      name="name"
                    />
                  </div>

                  <div>
                    <Label className="pl-1">Address Line 1</Label>
                    <Input
                      value={editCustomer.addressLine1}
                      onChange={handleChange}
                      name="addressLine1"
                    />
                  </div>
                  <div>
                    <Label className="pl-1">Address Line 2</Label>
                    <Input
                      value={editCustomer.addressLine2}
                      onChange={handleChange}
                      name="addressLine2"
                    />
                  </div>

                  <div>
                    <Label className="pl-1">GSTIN No.</Label>
                    <Input
                      value={editCustomer.gstin}
                      onChange={handleChange}
                      name="gstin"
                    />
                  </div>
                  <div>
                    <Label className="pl-1">State / Code</Label>
                    <Input
                      value={editCustomer.state}
                      onChange={handleChange}
                      name="state"
                    />
                  </div>
                </div>
              }
            />
            <AlertDialog
              icon={AiOutlineDelete}
              onClick={handleDelete}
              title="Are you sure you want to delete?"
              description="Once you have deleted this customer, it won't be available"
              submitlabel="Delete"
              buttonSecondaryLabel="Cancel"
              ghost
            />
          </div>
        )}
        <div className="flex justify-start  m-4 ">
          <div className="w-56 flex flex-col gap-1">
            <p className="h-5 overflow-hidden text-muted-foreground">
              Company Name
            </p>
            <p className="h-5 overflow-hidden text-muted-foreground">
              Address Line 1
            </p>
            <p className="h-5 overflow-hidden text-muted-foreground">
              Address Line 2
            </p>
            <p className="h-5 overflow-hidden text-muted-foreground">GSTIN</p>
            <p className="h-5 overflow-hidden text-muted-foreground">
              State / Code
            </p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="col-span-2 h-5 truncate w-52 md:w-80">
              {customer.name}
            </p>
            <p className=" h-5 overflow-hidden truncate w-52">
              {customer.addressLine1}
            </p>
            <p className="h-5 overflow-hidden w-52 md:w-48 lg:w-64  truncate ">
              {customer.addressLine2}
            </p>
            <p className="h-5 overflow-hidden truncate w-56">
              {customer.gstin}
            </p>
            <p className="h-5 overflow-hidden truncate w-52">
              {customer.state}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerCard;
