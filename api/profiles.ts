import { Profile } from "@/db/schema";

export async function getProfiles(token: string): Promise<Profile> {
  try {
    return fetch("/api/profiles", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (e) => {
      if (e.ok) {
        return await e.json();
      } else {
        const error = await e.json();
        throw new Error(error.error);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("An Error occured while trying to get profiles");
  }
}

export async function updateProfileDisplayName(
  newName: string,
  token: string
): Promise<Profile> {
  try {
    return fetch("/api/profiles", {
      method: "PUT",
      body: JSON.stringify({ newName }),
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (e) => {
      if (e.ok) {
        return await e.json();
      } else {
        const error = await e.json();
        throw new Error(error.error);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("An Error occured while trying to get profiles");
  }
}

export async function getUserProfile(
  userId: string,
  token: string
): Promise<Profile> {
  try {
    return fetch(`/api/profiles/${userId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (e) => {
      if (e.ok) {
        return await e.json();
      } else {
        const error = await e.json();
        throw new Error(error.error);
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error("An Error occured while trying to get profiles");
  }
}
