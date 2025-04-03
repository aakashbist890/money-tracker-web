import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("process.env.DJANGO_API_URL", process.env.DJANGO_API_URL);
  const djangoResponse = await fetch(
    `${process.env.DJANGO_API_URL}/api/users/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return NextResponse.json(await djangoResponse.json());
}
