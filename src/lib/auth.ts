export async function loginUser(email: string, password: string) {
  const { cookies } = await import("next/headers");
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  (await cookies()).set("auth-token", data.token);
}
