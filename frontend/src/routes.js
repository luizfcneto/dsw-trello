import UserRegisterPage from "./components/pages/UserRegisterPage.vue";
import UserLoginPage from "./components/pages/UserLoginPage.vue";
import LoggedHome from "./components/pages/LoggedHome.vue";
import UserBoardPage from "./components/pages/UserBoardPage.vue";
import SendMailPage from "./components/pages/SendMailPage.vue";
import RecoveryTokenPage from "./components/pages/RecoveryTokenPage.vue";

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
    },
    {
        "path": "/board/:boardId",
        "name": "board",
        "component": UserBoardPage,
        "props": (route) => ({
            boardId: decodeURIComponent(route.params.boardId)
        })
    },
    {
        "path": "/esqueceu/senha",
        "name": "sendMail",
        "component": SendMailPage
    },
    {
        "path": "/esqueceu/senha/:recoveryToken",
        "name": "recoveryToken",
        "component": RecoveryTokenPage
    }
]