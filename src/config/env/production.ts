import { config } from "dotenv";
config();

const productionEnv = {
    mongoDbUrl: process.env.MONGO_URI_PRODUCTION || ',',
    jwtSecret: process.env.JWT_SECRET_PRODUCTION || '',
    host: process.env.HOST_PRODUCTION || 8080
}

export default productionEnv;