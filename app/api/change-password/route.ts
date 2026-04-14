import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: session?.user?.email! },
    data: { password: hashed },
  });

  return Response.json({ success: true });
}