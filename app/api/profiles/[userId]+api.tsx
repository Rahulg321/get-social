import { db } from "@/db";
import { profiles, User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { eq } from "drizzle-orm";

export const GET = withAuth(async (req: Request, user: User) => {
  try {
    const userId = req.url.split("/").pop();

    if (!userId) {
      return Response.json(
        {
          error: "user id is not defined",
        },
        {
          status: 400,
        }
      );
    }

    const userProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, userId),
    });

    if (!userProfile) {
      return Response.json(
        {
          error: "Could not find user profile",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(userProfile);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "Error getting user profile",
      },
      {
        status: 400,
      }
    );
  }
});
