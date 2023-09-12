import { prisma } from "@/libs/prismadb";
import { currentUser } from "@clerk/nextjs";

import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.error();
    }
    let {
      name,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      state,
      gstin,
      panNumber,
      note,
      declaration,
      bankName,
      accountNumber,
      bankBranch,
      ifscCode,
      currentInvoiceNumber,
      currentEstimateNumber,
      invoiceFormat,
    } = await req.json();
    currentInvoiceNumber = +currentInvoiceNumber;
    currentEstimateNumber = +currentEstimateNumber;
    const createdCompany = await prisma.company.create({
      data: {
        userId: user?.id,
        name,
        email,
        mobileNumber,
        addressLine1,
        addressLine2,
        state,
        gstin,
        panNumber,
        declaration,
        note,
        bankName,
        accountNumber: accountNumber,
        bankBranch,
        ifscCode,
        currentInvoiceNumber,
        currentEstimateNumber,
        invoiceFormat,
      },
    });
    return NextResponse.json(createdCompany);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }
    const companyDetails = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json(companyDetails);
  } catch (err) {
    console.error(err);
  }
}

export async function PUT(req: Request) {
  try {
    const user = await currentUser();
    let {
      name,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      state,
      gstin,
      panNumber,
      note,
      declaration,
      bankName,
      accountNumber,
      bankBranch,
      ifscCode,
      currentInvoiceNumber,
      currentEstimateNumber,
      invoiceFormat,
    } = await req.json();
    if (!user) {
      return NextResponse.error();
    }
    currentInvoiceNumber = +currentInvoiceNumber;
    currentEstimateNumber = +currentEstimateNumber;
    const updatedDetails = await prisma.company.update({
      where: {
        userId: user.id,
      },
      data: {
        name,
        email,
        mobileNumber,
        addressLine1,
        addressLine2,
        state,
        gstin,
        panNumber,
        declaration,
        note,
        bankName,
        accountNumber: accountNumber,
        bankBranch,
        ifscCode,
        currentInvoiceNumber,
        currentEstimateNumber,
        invoiceFormat,
      },
    });
    return NextResponse.json(updatedDetails);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
