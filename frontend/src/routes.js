import FormCadastro from "./components/pages/FormCadastro.vue";
import FormLogin from "./components/pages/FormLogin.vue";

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
    }
]