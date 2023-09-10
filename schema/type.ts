export type SafeUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type Company = {
  id: number;
  userId: number;
  name: string;
  email: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  gstin: string;
  panNumber: string;
  declaration: string;
  note: string;
  bankName: string;
  accountNumber: string;
  bankBranch: string;
  ifscCode: string;
  currentInvoiceNumber: number;
  currentEstimateNumber: number;
  invoiceFormat: string;
};

export type Customer = {
  id: number;
  userId: number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  gstin: string;
};

export type Products = {
  id: number;
  userId: number;
  description: string;
  hnsCode: string;
  quantity: number;
  unit: string;
  rate: number;
};

export type Invoice = {
  id: number;
  invoiceNumber: string;
  invoiceType: string;
  date: Date;
  vehicleNumber: string;
  userId: number;
  customerId: number;
  optionalField: ExtraFields;
  additinalCharges: ExtraFields;
  discount: ExtraFields;
  taxableAmount: number | null;
  paymentStatus: string;
  items: Array<InvoiceItems>;
};

export type InvoiceItems = {
  id: number;
  description: string;
  hsncode: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  invoiceId: number;
};
export type Estimate = {
  id: number;
  estimateNumber: string;
  date: Date;
  vehicleNumber: string | null;
  optionalField: ExtraFields;
  companyId: number;
  userId: number;
  additinalCharges: ExtraFields;
  discount: ExtraFields;
  taxableAmount: number;
  approvalStatus: string;
  items: Array<EstimateItems>;
};
export type EstimateItems = {
  id: number;
  description: string;
  hsncode: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  estimateId: number;
};

export type checkFilter = {
  id?: number;
  label: string;
  checked: boolean;
};

export type ExtraFields = {
  label: string;
  value: number;
};

export type DataAnalytics = {
  totalAmount: number;
  totalAmountRate: number;
  totalAmountPaid: number;
  totalAmountPaidRate: number;
  totalInvoices: number;
  totalInvoicesRate: number;
  totalCustomers: number;
  totalCustomersRate: number;
};

export type TopCustomers = {
  name: string;
  amount: number;
  invoices: number;
};
