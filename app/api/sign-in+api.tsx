import { db } from "@/db";
import { users } from "@/db/schema";
import { generateJwt, hashPassword } from "@/utils/auth";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export function GET(request: Request) {
  return Response.json({ hello: "world" });
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("inside api sign up", email, password);

    if (!email || !password)
      return Response.json(
        { message: "Email pwd does not exist" },
        {
          status: 400,
        }
      );

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return Response.json(
        { message: "User was not found" },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hashPassword(password);

    if (user.password !== hashedPassword) {
      return Response.json(
        { message: "passwords do not match" },
        {
          status: 400,
        }
      );
    }

    const token = await generateJwt(user.id);

    return Response.json(
      { token },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error inside sign up api", error);
    return Response.json(
      { message: "Server error occured" },
      {
        status: 400,
      }
    );
  }
}
