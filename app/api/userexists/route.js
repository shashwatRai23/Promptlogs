import User from "@models/user";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@utils/database";
export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectToDatabase();
    console.log("req : ", req);
    const user = await User.findOne({ email : email }) ;
    console.log("user : ", user);
    if(user){
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    else{
      return NextResponse.json({ message: "User does not exist" }, { status: 200 });
    }
  } catch (e) {
    console.log(e);
  }
}
