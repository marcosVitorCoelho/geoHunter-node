import mongoose, { Document, Schema } from "mongoose";

interface RegularUserInterface extends Document {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    birthDate: Date;
    profileImageUrl: string;
}

const RegularUserSchema = new Schema<RegularUserInterface>(
    {
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
        email: { type: "string", required: true },
        password: { type: "string", required: true },
        address: { type: "string", required: true },
        birthDate: { type: "Date", required: true },
        profileImageUrl: { type: "string", required: true },
    },
    { timestamps: true }
)

export default mongoose.model<RegularUserInterface>("RegularUser", RegularUserSchema);

