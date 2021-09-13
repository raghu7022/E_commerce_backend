import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDb is connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error ${error.message}`)
        process.exit(1)
    }
}

export default connectDb