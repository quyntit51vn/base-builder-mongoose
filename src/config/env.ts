import developmentEnv from "./env/development";
import stagingEnv from "./env/staging";
import productionEnv from "./env/production";
import { Environment } from "./type";

const loadConfig = (): Environment => {
    let keys: Environment;
    if (process.env.NODE_ENV === 'production') keys = productionEnv;
    else if (process.env.NODE_ENV === 'staging') keys = stagingEnv;
    else keys = developmentEnv;

    return keys
}

export const ENV = loadConfig();