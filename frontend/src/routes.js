import FormCadastro from "./components/pages/FormCadastro.vue";
import FormLogin from "./components/pages/FormLogin.vue";
import LoggedHome from "./components/pages/LoggedHome.vue";

export const routes = [
    {
        "path": '/cadastro',
        "name": "form-cadastro",
        "component": FormCadastro
    },
    {
        "path": "/login",
        "name": "login",
        "component": FormLogin
    },
    {
        "path": "/home",
        "name": "home",
        "component": LoggedHome,
    }
]