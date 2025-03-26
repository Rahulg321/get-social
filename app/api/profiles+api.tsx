import { db } from "@/db";
import { profiles, User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { eq } from "drizzle-orm";

export const GET = withAuth(async (req: Request, user: User) => {
  try {
    const userProfile = await db.query.profiles.findFirst({
      where: eq(profiles.userId, user.id),
    });
    return Response.json(userProfile);
  } catch (error) {
    console.log("Error", error);
    return Response.json(
      {
        error: "Server side error occured",
      },
      {
        status: 400,
      }
    );
  }
});

export const PUT = withAuth(async (req: Request, user: User) => {
  try {
    const { newName } = await req.json();

    if (!newName) {
      return Response.json(
        {
          error: "New Display is not present",
        },
        {
          status: 404,
        }
      );
    }

    console.log("inside profile put request", newName);
    const newProfile = await db
      .update(profiles)
      .set({ displayName: newName })
      .where(eq(profiles.userId, user.id));
    return Response.json(newProfile);
  } catch (error) {
    console.log("Error", error);
    return Response.json(
      {
        error: "Server side error occured",
      },
      {
        status: 400,
      }
    );
  }
});
