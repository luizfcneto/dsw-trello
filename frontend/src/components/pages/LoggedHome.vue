<template>
    <div class="logged-home">
        <Header v-if="!isLoading" :is-logged="isLogged()" :user="user"></Header>
        <h2> Meus Quadros </h2>

        <div class="container-content">
            <div class="container-form-board">
                <BoardRegister></BoardRegister>
            </div>

            <div class="container-boards-collection">
                <div v-for="(collection, index) of collectionsBoards" :key="index">
                    <CollectionBoards :collectionName="collection.name" :boards="collection.boards">
                    </CollectionBoards>
                </div>
            </div>

        </div>

        <LoggedFooter></LoggedFooter>
    </div>
</template>

<script>
import Header from "../shared/Header.vue";
import LoggedFooter from "../shared/LoggedFooter.vue";
import CollectionBoards from "../shared/CollectionBoards.vue";
import BoardRegister from "../shared/BoardRegister.vue";
import { logout } from "../../services/logout.js";
import { getUserByToken } from "../../services/api.js";

export default {
    name: "LoggedHome",
    components: {
        Header,
        LoggedFooter,
        CollectionBoards,
        BoardRegister
    },

    data() {
        return {
            user: {
                username: "",
                email: ""
            },
            isLoading: true,
            collectionsBoards: [
                {
                    collectionId: 1,
                    name: "Colecao 1",
                    boards: [
                        {
                            id: 1,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadroXEncriptado"
                        },

                    ]
                },
                {
                    collectionId: 2,
                    name: "Colecao 2",
                    boards: [
                        {
                            id: 10,
                            title: "Quadro 10",
                            backgroundColor: "",
                            path_url: "quadro10Encriptado"
                        },
                        {
                            id: 15,
                            title: "Quadro 15",
                            backgroundColor: "",
                            path_url: "quadro15Encriptado"
                        },
                        {
                            id: 13,
                            title: "Quadro 13",
                            backgroundColor: "",
                            path_url: "quadro13Encriptado"
                        },
                        {
                            id: 19,
                            title: "Quadro 19",
                            backgroundColor: "",
                            path_url: "quadro19Encriptado"
                        },
                        {
                            id: 20,
                            title: "Quadro 20",
                            backgroundColor: "",
                            path_url: "quadro20Encriptado"
                        },
                        {
                            id: 33,
                            title: "Quadro 33",
                            backgroundColor: "",
                            path_url: "quadro33Encriptado"
                        },
                        {
                            id: 70,
                            title: "Quadro 70",
                            backgroundColor: "",
                            path_url: "quadro70Encriptado"
                        },
                        {
                            id: 18,
                            title: "Quadro 18",
                            backgroundColor: "",
                            path_url: "quadro18Encriptado"
                        }
                    ]
                },
                {
                    collectionId: 3,
                    name: "Colecao 3",
                    boards: [
                        {
                            id: 50,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro50Encriptado"
                        },
                        {
                            id: 51,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro51Encriptado"
                        },
                        {
                            id: 52,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro52Encriptado"
                        },
                        {
                            id: 53,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro53Encriptado"
                        },
                        {
                            id: 54,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro54Encriptado"
                        },
                        {
                            id: 55,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro55Encriptado"
                        },
                        {
                            id: 56,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro56Encriptado"
                        },
                        {
                            id: 57,
                            title: "Quadro X",
                            backgroundColor: "",
                            path_url: "quadro57Encriptado"
                        }
                    ]
                }
            ]
        }
    },

    props: {

    },

    methods: {
        isLogged() {
            return this.$root.credentials.token !== null;
        },
        async getUserInfo() {
            console.log("getUserInfo executado");
            try {
                const { user } = await getUserByToken(this.$root.credentials.token);
                this.user = user;
                this.isLoading = false;
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async getUserBoards() {

        }
    },

    watch: {
        async isLogged(newValue) {
            console.log("watch acionado valor de newValue: ", newValue);
            if (newValue) {
                console.log("newValue positivo");
                await this.getUserInfo();
            }
        }
    },

    async created() {
        if (!this.isLogged()) {
            console.log("não esta logado, redirecionado pro logout -> login page")
            logout(this.$root);
        }

        if (this.isLogged()) {
            console.log("está logado, carregar informações do usuário");
            await this.getUserInfo();
        }
    }

}
</script>

<style scoped>
h2 {
    width: 100%;
    text-align: center;
    margin: 0.5em auto;
    font-size: 32px;
    font-weight: bold;
}


.logged-home {
    z-index: 1;
}

.container-content {
    display: flex;
    width: 95%;
    margin: 0 auto;
    flex-flow: row;
}

.container-form-board {
    width: 40%;
    margin: 0 auto;
}

.container-boards-collection {
    width: 80%;
}
</style>