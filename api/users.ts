export async function signUp(email: string, password: string) {
  const response = await fetch("/api/sign-up", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
}

export async function signIn(email: string, password: string) {
  const response = await fetch("/api/sign-in", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
}
