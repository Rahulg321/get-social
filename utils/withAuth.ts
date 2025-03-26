import { db } from "@/db";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

async function getUser(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return undefined;
  }

  try {
    const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as {
      userId: string;
    };

    const foundUser = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId),
    });

    return foundUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function withAuth(
  handler: (request: Request, user: User) => Promise<Response>
) {
  return async (request: Request) => {
    const user = await getUser(request);
    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        {
          status: 401,
        }
      );
    }
    return handler(request, user);
  };
}
