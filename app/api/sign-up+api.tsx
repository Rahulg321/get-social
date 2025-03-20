import { db } from "@/db";
import { users } from "@/db/schema";
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

    // if (password.length < 8)
    //   return Response.json(
    //     { message: "Password must be atleast 8 characters long" },
    //     {
    //       status: 400,
    //     }
    //   );

    if (!email.includes("@"))
      return Response.json(
        { message: "Email must include @" },
        {
          status: 400,
        }
      );

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) {
      return Response.json(
        { message: "User already exists" },
        {
          status: 400,
        }
      );
    }

    const [createdUser] = await db
      .insert(users)
      .values({
        email,
        //TODO-SALT AND HASH PASSWORD
        password,
      })
      .returning();

    const token = jwt.sign(
      {
        id: createdUser.id,
      },
      process.env.JWT_SECRET!
    );

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
