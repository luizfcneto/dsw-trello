import UserRegisterPage from "./components/pages/UserRegisterPage.vue";
import UserLoginPage from "./components/pages/UserLoginPage.vue";
import LoggedHome from "./components/pages/LoggedHome.vue";

export const routes = [
    {
        "path": '/cadastro',
        "name": "form-cadastro",
        "component": UserRegisterPage
    },
    {
        "path": "/login",
        "name": "login",
        "component": UserLoginPage
    },
    {
        "path": "/home",
        "name": "home",
        "component": LoggedHome,
    }
]