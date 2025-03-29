import { db } from "@/db";
import { followers, User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { and, eq } from "drizzle-orm";

export const GET = withAuth(async (req: Request, user: User) => {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return Response.json(
        {
          error: "User Id is required",
        },
        {
          status: 400,
        }
      );
    }

    // in here we check whether the logged In user currently follows the user he is trying to follow

    console.log("userid inside get request", userId);
    const following = await db.query.followers.findFirst({
      where: and(
        eq(followers.userId, user.id),
        eq(followers.followingId, userId)
      ),
    });

    console.log("checking user follow", following);

    return Response.json(!!following);
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "Error occured inside GET",
      },
      {
        status: 400,
      }
    );
  }
});

//post request for when a user wants to follow somebody
export const POST = withAuth(async (req: Request, user: User) => {
  try {
    const { toFollowUserId, unFollow } = await req.json();

    if (!toFollowUserId) {
      return Response.json(
        {
          error: "USER ID is required to follow",
        },
        {
          status: 400,
        }
      );
    }

    if (unFollow) {
      await db
        .delete(followers)
        .where(
          and(
            eq(followers.userId, user.id),
            eq(followers.followingId, toFollowUserId)
          )
        )
        .returning();

      return Response.json(
        {
          following: undefined,
        },
        {
          status: 200,
        }
      );
    } else {
      const following = await db.query.followers.findFirst({
        where: and(
          eq(followers.userId, user.id),
          eq(followers.followingId, toFollowUserId)
        ),
      });

      if (following) {
        return Response.json(
          {
            error: "Already Following",
          },
          {
            status: 400,
          }
        );
      }

      const [insertedFollower] = await db
        .insert(followers)
        .values({
          userId: user.id,
          followingId: toFollowUserId,
        })
        .returning();

      return Response.json(insertedFollower);
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        error: "An error occured",
      },
      {
        status: 400,
      }
    );
  }
});
