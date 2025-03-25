import { db } from "@/db";
import { Post, posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
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

export type GetPostResponse = (Post & {
  profile: {
    displayName: string;
  };
})[];

export async function GET(req: Request) {
  try {
    const user = await getUser(req);

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
}

export async function POST(req: Request) {
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

    const user = await getUser(req);

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
}
