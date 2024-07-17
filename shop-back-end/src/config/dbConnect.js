import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const {URL_DB} = process.env
const Connectdb = ()=>{
    mongoose.connect(URL_DB)
    .then(()=>console.log("connect successfully"))
    .catch(()=>console.log("connect failed"))
}

export default Connectdb  