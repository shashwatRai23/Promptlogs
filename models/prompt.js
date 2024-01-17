import { Schema,model,models } from "mongoose";

const PromptSchema = new Schema({   
    prompt: {
        type: String,
        required: [true, 'Please add a prompt'],
    },  
    tag: {
        type: String,
        required: [true, 'Please add a tag'],
    },  
    creator: {
        ref: "User",
        type: String,
        required: true,
    },  
});

const Prompt=models.Prompt || model("Prompt",PromptSchema);

export default Prompt;
