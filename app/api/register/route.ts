import { prisma } from "@/libs/prismadb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        userId: "1",
      },
    });

    return NextResponse.json({
      user,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
