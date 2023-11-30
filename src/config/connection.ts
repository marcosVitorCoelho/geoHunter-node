import 'dotenv/config'
import mongoose, { ConnectOptions } from "mongoose";

export const connect = (): void => {
    const options: ConnectOptions = { useUnifiedTopology: true } as any;
    mongoose.connect(process.env.MONGODB_URI || '', options).then(() => console.log("DB connected")).catch(() => console.log("Database not connected"));
}
