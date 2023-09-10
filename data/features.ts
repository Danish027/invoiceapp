import { FaFileInvoice, FaRupeeSign } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { BsFillCalculatorFill, BsDatabaseFillCheck } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";
const features = [
  {
    heading: "Easy Invoice Creation",
    icon: FaFileInvoice,
    paragraphts: [
      "Intuitive interface for creating professional invoices quickly and easily.",
      "Customizable templates with options for adding your branding elements.",
    ],
  },
  {
    heading: "Estimate Bill Generation",
    icon: RiBillFill,
    paragraphts: [
      "Ability to create estimates and convert them into invoices seamlessly.",
      "Provide clients with accurate cost estimates for projects or services.",
    ],
  },
  {
    heading: "Automated Calculation",
    icon: BsFillCalculatorFill,
    paragraphts: [
      "Automatic calculation of totals, taxes, discounts, and subtotals.",
      "Instant updates as you add or modify items and quantities.",
    ],
  },
  {
    heading: "Payment Tracking",
    icon: FaRupeeSign,
    paragraphts: [
      "Track payment status and due dates for each invoice.",
      "Record and reconcile payment transactions for easy tracking and accounting.",
    ],
  },
  {
    heading: "Reporting and Analytics",
    icon: IoMdAnalytics,
    paragraphts: [
      "Generate reports on revenue, outstanding payments, and overall financial performance.",
      "Visualize data through charts and graphs for easy understanding.",
    ],
  },
  {
    heading: "Data Backup and Security",
    icon: BsDatabaseFillCheck,
    paragraphts: [
      "Regular data backups to prevent loss of important financial records.",
      "Robust data security measures to protect sensitive client information.",
    ],
  },
];

export default features;
