import connectDB from "./db/index.js"
import dotenv from 'dotenv'
import {app} from "./app.js"

dotenv.config({
    path: '.env'
})

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on ${process.env.PORT || 8000}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed!!", err );
})

// console.log("URI: ",process.env.MONGODB_URI);
// console.log("DB_NAME: ",DB_NAME);

// ( async () => {
//         try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Error: ",error)
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("Error: ",error)
//         throw error
//     }
// } )()