import { connectToDatabase } from "@utils/database"
import { NextResponse } from "next/server";
import Prompt from "@models/prompt";

console.log("GET request");

export async function GET(req,{params}){
    try{
        await connectToDatabase();
        const prompts=await Prompt.find({creator: params.id});
        // console.log("prompts : ",prompts);
        return NextResponse.json({prompts},{status:200});
    }
    catch(e){
        return NextResponse.json({message:"An error occurred while fetching prompts"},{status:500});
    }
}