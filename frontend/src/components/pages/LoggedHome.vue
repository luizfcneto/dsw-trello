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
                            backgroundColor: ""
                        },
                        {
                            id: 2,
                            title: "Quadro X",
                            backgroundColor: ""
                        },
                        {
                            id: 3,
                            title: "Quadro 3",
                            backgroundColor: ""
                        },
                        {
                            id: 4,
                            title: "Quadro 4",
                            backgroundColor: ""
                        },
                        {
                            id: 5,
                            title: "Quadro 5",
                            backgroundColor: ""
                        },
                        {
                            id: 6,
                            title: "Quadro 6",
                            backgroundColor: ""
                        },
                        {
                            id: 7,
                            title: "Quadro 7",
                            backgroundColor: ""
                        },
                        {
                            id: 8,
                            title: "Quadro 8",
                            backgroundColor: ""
                        }
                    ]
                },
                {
                    collectionId: 2,
                    name: "Colecao 2",
                    boards: [
                        {
                            id: 10,
                            title: "Quadro 10",
                            backgroundColor: ""
                        },
                        {
                            id: 15,
                            title: "Quadro 15",
                            backgroundColor: ""
                        },
                        {
                            id: 13,
                            title: "Quadro 13",
                            backgroundColor: ""
                        },
                        {
                            id: 19,
                            title: "Quadro 19",
                            backgroundColor: ""
                        },
                        {
                            id: 20,
                            title: "Quadro 20",
                            backgroundColor: ""
                        },
                        {
                            id: 33,
                            title: "Quadro 33",
                            backgroundColor: ""
                        },
                        {
                            id: 70,
                            title: "Quadro 70",
                            backgroundColor: ""
                        },
                        {
                            id: 18,
                            title: "Quadro 18",
                            backgroundColor: ""
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
                            backgroundColor: ""
                        },
                        {
                            id: 51,
                            title: "Quadro X",
                            backgroundColor: ""
                        },
                        {
                            id: 52,
                            title: "Quadro X",
                            backgroundColor: ""
                        },
                        {
                            id: 53,
                            title: "Quadro X",
                            backgroundColor: ""
                        },
                        {
                            id: 54,
                            title: "Quadro X",
                            backgroundColor: ""
                        },
                        {
                            id: 55,
                            title: "Quadro X",
                            backgroundColor: ""
                        },
                        {
                            id: 56,
                            title: "Quadro X",
                            backgroundColor: ""
                        },
                        {
                            id: 57,
                            title: "Quadro X",
                            backgroundColor: ""
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
        isLogged(newValue) {
            console.log("watch acionado valor de newValue: ", newValue);
            if (newValue) {
                console.log("newValue positivo");
                this.getUserInfo();
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