import { db } from "@/db";
import { followers, Profile, profiles, User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { count, eq } from "drizzle-orm";

export type ProfileResponse = Profile & {
  followersCount: number;
  followingCount: number;
};

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

    const followingCount = await db
      .select({
        count: count(),
      })
      .from(followers)
      .where(eq(followers.userId, userId));

    const followersCount = await db
      .select({
        count: count(),
      })
      .from(followers)
      .where(eq(followers.followingId, userId));

    return Response.json({
      ...userProfile,
      followingCount: followingCount[0].count,
      followersCount: followersCount[0].count,
    });
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
