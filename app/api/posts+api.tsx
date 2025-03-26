import { db } from "@/db";
import { Post, posts, User, users } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { desc, eq } from "drizzle-orm";

export type GetPostResponse = (Post & {
  profile: {
    displayName: string;
  };
})[];

export const GET = withAuth(async (req: Request, user: User) => {
  try {
    if (!user) {
      return Response.json(
        {
          error: "User is not available",
        },
        {
          status: 400,
        }
      );
    }

    const fetchedPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      limit: 20,
      with: {
        profile: {
          columns: {
            displayName: true,
          },
        },
      },
    });

    return Response.json(fetchedPosts);
  } catch (error) {
    console.log("error inside posts api ", error);
    return Response.json(
      { error: "Server error occured" },
      {
        status: 400,
      }
    );
  }
});

export const POST = withAuth(async (req: Request, user: User) => {
  try {
    const { text } = await req.json();

    if (!text) {
      return Response.json(
        {
          error: "No Text",
        },
        {
          status: 400,
        }
      );
    }

    if (!user) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 400,
        }
      );
    }

    const [insertedPost] = await db
      .insert(posts)
      .values({
        text,
        userId: user.id,
      })
      .returning();

    return Response.json(insertedPost);
  } catch (error) {
    console.log("error inside posts api ", error);
    return Response.json(
      { error: "Server error occured" },
      {
        status: 400,
      }
    );
  }
});
