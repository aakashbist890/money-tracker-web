import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const djangoResponse = await fetch(
    `${process.env.DJANGO_API_URL}/api/auth/register/`,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  return NextResponse.json(await djangoResponse.json());
}
