import { Follower } from "@/db/schema";

/**
 * returns whether the current logged in user follows the userId or not
 *
 */
export async function getFollowing(token: string, userId: string) {
  return fetch(`/api/followers?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return (await response.json()) as boolean;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}

/**
 *
 * This function can be used to follow or unfollow a user
 *
 * @param token
 * @param toFollowUserId
 * @param unFollow
 * @returns
 */
export async function followUser(
  token: string,
  toFollowUserId: string,
  unFollow: boolean
) {
  return fetch(`/api/followers`, {
    method: "POST",
    body: JSON.stringify({ toFollowUserId, unFollow }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return (await response.json()) as Follower;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}
