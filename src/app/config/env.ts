import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string,
    DATABASE_URL: string,
    NODE_ENV: string,
    cloud_name: string,
    api_key: string,
    api_secret: string,
    ROUTER_API_KEY : string,
    STRIPE_SECRET_KEY : string,
    CLIENT_URL : string,
}

const loadEnvVariable = (): EnvConfig => {
    const requiredEnvVariable: string[] = ["PORT", "DATABASE_URL", "NODE_ENV", "cloud_name", "api_key", "api_secret", "ROUTER_API_KEY", "STRIPE_SECRET_KEY", "CLIENT_URL"]

    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        NODE_ENV: process.env.NODE_ENV as string,
        cloud_name : process.env.cloud_name as string,
        api_key : process.env.api_key as string,
        api_secret : process.env.api_secret as string,
        ROUTER_API_KEY : process.env.ROUTER_API_KEY as string,
        STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_KEY as string,
        CLIENT_URL : process.env.CLIENT_URL as string,
    }
}

export const envVars = loadEnvVariable();