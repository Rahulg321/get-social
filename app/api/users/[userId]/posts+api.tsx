import { db } from "@/db";
import { posts, profiles, User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { eq } from "drizzle-orm";

export const GET = withAuth(async (req: Request, user: User) => {
  try {
    const parts = req.url.split("/");

    const userId = parts[parts.length - 2];

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

    const userPosts = await db.query.posts.findMany({
      where: eq(posts.userId, userId),
    });

    if (!userPosts) {
      return Response.json(
        {
          error: "Could not find user profile",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(userPosts);
  } catch (error) {
    return Response.json(
      {
        error: "Error getting user posts",
      },
      {
        status: 400,
      }
    );
  }
});
