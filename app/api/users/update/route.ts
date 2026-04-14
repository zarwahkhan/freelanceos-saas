import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  const { name, password, email } = await req.json();
  const hashed = password ? await bcrypt.hash(password, 10) : undefined;

  const updated = await prisma.user.update({
    where: { email },
    data: { name, password: hashed },
  });
  return NextResponse.json(updated);
}