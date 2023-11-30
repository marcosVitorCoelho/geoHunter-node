import mongoose, { Document, Schema } from "mongoose";

export interface RegularUserInterface extends Document {
    firstName: string;
    lastName: string;
    rg: string;
    cpf: string;
    phoneNumber: string;
    email: string;
    address: {
        street: string;
        city: string;
        state: string;
        number: string;
        zipCode: string;
        latitud: string;
        longitud: string;
    };
    password: string;
    birthDate: Date;
    profileImageUrl: string;
}

const RegularUserSchema = new Schema<RegularUserInterface>(
    {
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
        email: { type: "string", required: true },
        cpf: {type: "string", required: true},
        rg: {type: "string", required: true},
        phoneNumber: {type: "string", required: true},
        password: { type: "string", required: true },
        address: {
            street: { type: "string", required: true},
            city: { type: "string", required: true},
            state: { type: "string", required: true},
            number: { type: "string", required: true},
            zipCode: { type: "string", required: true},
            latitud: { type: "string", required: true},
            longitud: { type: "string", required: true}

        },
        birthDate: { type: "Date", required: true },
        profileImageUrl: { type: "string", required: true },
    },
    { timestamps: true }
)

export default mongoose.model<RegularUserInterface>("RegularUser", RegularUserSchema);

