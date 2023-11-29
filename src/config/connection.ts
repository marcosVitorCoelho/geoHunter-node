import mongoose, { ConnectOptions } from "mongoose";

export const connect = (): void => {
    const options: ConnectOptions = { useUnifiedTopology: true } as any;
    mongoose.connect("mongodb+srv://geoHunterDev:geoHunterDev@geohunter.6mrr62o.mongodb.net/?retryWrites=true&w=majority", options).then(() => console.log("DB connected")).catch(() => console.log("Database not connected"));
}
