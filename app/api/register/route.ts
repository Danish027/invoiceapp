import { prisma } from "@/libs/prismadb";
import { currentUser } from "@clerk/nextjs";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const activeuser = await currentUser();
    const { name, email, password } = await req.json();
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        userId: randomUUID(),
      },
    });

    return NextResponse.json({
      user,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
