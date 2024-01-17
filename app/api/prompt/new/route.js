import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, tag, userEmail } = await req.json();
  try {
    await connectToDatabase();
    const newPrompt = await Prompt.create({
      prompt,
      tag,
      creator: userEmail,
    });
    return NextResponse.json(
      { message: "Prompt created successfully", newPrompt },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}
