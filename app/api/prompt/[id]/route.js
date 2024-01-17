
import { connectToDatabase } from "@utils/database"
import { NextResponse } from "next/server";
import Prompt from "@models/prompt";

// Get Request: /api/prompt/%5Bid%5D
export async function GET(req,{params}){
    try{
        await connectToDatabase();
        const prompt=await Prompt.findById(params.id);
        if(!prompt){
            return NextResponse.json({message:"Prompt not found"},{status:404});
        }
        return NextResponse.json({prompt},{status:200});
    }
    catch(e){
        return NextResponse.json({message:"An error occurred while fetching prompts"},{status:500});
    }
}

// Patch Request: /api/prompt/%5Bid%5D(To Update Prompt)
export async function PATCH(req,{params}){
    const {prompt,tag}=await req.json();
    try{

        await connectToDatabase();
        const existingPrompt=await Prompt.findById(params.id);
        if(!existingPrompt){
            return NextResponse.json({message:"Prompt not found"},{status:404});
        }
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();
        return NextResponse.json({existingPrompt},{status:200});
    }
    catch(e){
        return NextResponse.json({message:"An error occurred while updating prompt"},{status:500});
    }
}

// Delete Request: /api/prompt/%5Bid%5D
export async function DELETE(req,{params}){
    try{
        await connectToDatabase();
        await Prompt.findByIdAndDelete(params.id);
        return NextResponse.json({message:"Prompt deleted successfully"},{status:200});
    }
    catch(e){
        return NextResponse.json({message:"An error occurred while deleting prompt"},{status:500});
    }
}