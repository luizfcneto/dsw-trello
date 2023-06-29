import { router } from "../main.js";

export const logout = (vueContext) => {
    vueContext.credentials.token = null;    
    router.push("/login");
}

