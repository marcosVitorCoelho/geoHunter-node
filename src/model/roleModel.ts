import mongoose, { Document, Schema } from "mongoose";

export interface RoleInterface extends Document {
    title: string;
    description: string;
}

const RoleSchema = new Schema<RoleInterface>(
    {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
    },
    { timestamps: true }
)

export default mongoose.model<RoleInterface>("Role", RoleSchema);

