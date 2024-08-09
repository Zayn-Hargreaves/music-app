import mongoose from "mongoose"
export const connect = async(): Promise<void> =>{
    // console.log(process.env.MONGOOSE_URL)
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Connect Success!")
    } catch (error) {
       console.log("connect Fail!")
    }
}
