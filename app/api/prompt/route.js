import { connectToDatabase } from "@utils/database"
import { NextResponse } from "next/server";
import Prompt from "@models/prompt";

export async function GET(req){
    try{
        await connectToDatabase();
        const prompts=await Prompt.find({});
        return NextResponse.json({prompts},{status:200});
    }
    catch(e){
        return NextResponse.json({message:"An error occurred while fetching prompts"},{status:500});
    }
}