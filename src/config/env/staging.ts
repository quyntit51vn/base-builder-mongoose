import { config } from "dotenv";
config();

const stagingEnv = {
    mongoDbUrl: process.env.MONGO_URI_STAGING || ',',
    jwtSecret: process.env.JWT_SECRET_STAGING || '',
    host: process.env.HOST_STAGING || 8080
}

export default stagingEnv;