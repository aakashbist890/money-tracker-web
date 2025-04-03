import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Login atte,pt:", body.email);

  const djangoResponse = await fetch(
    `${process.env.DJANGO_API_URL}/auth/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!djangoResponse.ok) {
    throw new Error("Login failed");
  }
  const data = await djangoResponse.json();
  return NextResponse.json(data);
}
