import { router } from "../main.js";

export const logout = (vueContext) => {
    clearToken(vueContext);    
    router.push("/login");
}

export const clearToken = (vueContext) => {
    vueContext.credentials.token = null;
}

