import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Login atte,pt:", body.email);

  const djangoResponse = await fetch(
    `${process.env.DJANGO_API_URL}/api/auth/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: body.email.includes('@') ? 
                  body.email.split('@')[0] : 
                  body.email,
        password: body.password
      }),
    }
  );

  if (!djangoResponse.ok) {
    throw new Error("Login failed");
  }
  const data = await djangoResponse.json();
  return NextResponse.json(data);
}
