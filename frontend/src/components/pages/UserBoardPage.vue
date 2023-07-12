<template>
    <div class="board_page_container">
        <Header v-show="isHeaderProfileReady" :is-logged="isLogged()" :user="user"></Header>
        <section class="board-info-bar">
            <div class="board-controls">
                <button class="board-title btn">
                    <h2>Web Development</h2>
                </button>

                <!-- <button class="star-btn btn" aria-label="Star Board">
                    <i class="far fa-star" aria-hidden="true"></i>
                </button> -->
            </div>
        </section>

        <section class="lists-container">
            <BoardList v-for="(list, index) of this.board.lists" :key="index" :list="list"></BoardList>
            <button class="add-list-btn btn">Add a list</button>
        </section>

    </div>
</template>

<script>
import Header from '../shared/Header.vue';
import BoardList from '../shared/BoardList.vue';
import { logout } from "../../services/logout.js";
import { getUserByToken } from "../../services/api.js";

export default {
    name: "UserBoardPage",

    components: {
        Header,
        BoardList,
    },

    props: {
        boardId: {
            type: String,
            required: true
        },

    },

    data() {
        return {
            isHeaderProfileReady: false,
            user: {},
            board: {
                boardId: 1,
                title: "Meu Quadro",
                lists: [
                    {
                        listId: 1,
                        title: "BACKLOG",
                        cards: [
                            {
                                cardId: 1,
                                content: "DescricaoCard"
                            },
                            {
                                cardId: 2,
                                content: "Card 2"
                            }
                        ]
                    },
                    {
                        listId: 2,
                        title: "Sprint Backlog",
                        cards: [
                            {
                                cardId: 1,
                                content: "Componente UserBoardPage"
                            },
                            {
                                cardId: 2,
                                content: "Componente BoardList"
                            }
                        ]
                    },
                    {
                        listId: 3,
                        title: "TODO",
                        cards: [
                            {
                                cardId: 1,
                                content: "Conteudo"
                            },
                            {
                                cardId: 2,
                                content: "Dormir"
                            },
                            {
                                cardId: 3,
                                content: "Atualizar Curriculo"
                            },
                            {
                                cardId: 4,
                                content: "Terminar TCC"
                            }
                        ]
                    },
                    {
                        listId: 4,
                        title: "TESTING",
                        cards: [
                            {
                                cardId: 1,
                                content: "Testando Componente List"
                            },
                            {
                                cardId: 2,
                                content: "Testando Componente Card"
                            }
                        ]
                    },
                    {
                        listId: 5,
                        title: "DONE",
                        cards: [
                            {
                                cardId: 1,
                                content: "Componente Header"
                            },
                            {
                                cardId: 2,
                                content: "Componente LoggedHome"
                            },
                            {
                                cardId: 3,
                                content: "Componente UserLoginPage"
                            },
                            {
                                cardId: 4,
                                content: "Componente UserRegisterPage"
                            },
                            {
                                cardId: 5,
                                content: "Componente ErrorSpan"
                            }
                        ]
                    },
                ]
            }
        }
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
                this.isHeaderProfileReady = true;
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        // TODO
        async getBoardInfo() {

        }
    },

    async created() {
        if (!this.isLogged()) {
            logout(this.$root);
        }

        if (this.isLogged()) {
            await this.getUserInfo();
        }
    }

}
</script>

<style scoped>
/* btn global utilizado no titulo, no ultimo card e na ultima lista */
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
}

:focus {
    outline-color: #fa0;
}

/* Board info bar */

.board-info-bar {
    flex-basis: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.8rem 0;
    padding: 0 1rem;
}

.board-controls {
    display: flex;
}

.board-controls .btn {
    margin-right: 1rem;
}

.board-controls .btn:last-of-type {
    margin-right: 0;
}

.board-info-bar .btn {
    font-size: 1.4rem;
    font-weight: 400;
    transition: background-color 150ms;
    padding: 0 0.6rem;
    border-radius: 0.3rem;
    height: 3rem;
}

.board-info-bar .btn:hover {
    background-color: #373636;
}

.board-title h2 {
    font-size: 1.8rem;
    font-weight: 700;
    white-space: nowrap;
}

/* Lists */

.lists-container::-webkit-scrollbar {
    height: 1rem;
}

.lists-container::-webkit-scrollbar-thumb {
    background-color: #333;
    border: 0.1rem solid #242323;
    border-top-width: 0;
}

.lists-container {
    display: flex;
    align-items: start;
    padding: 0 0.3rem 0.3rem;
    overflow-x: auto;
    height: calc(100vh - 8.6rem);
}

/* Estilos dos botões */
.add-list-btn {
    flex: 0 0 20rem;
    display: block;
    font-size: 1.4rem;
    font-weight: 400;
    background-color: #333;
    color: #fff;
    padding: 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: background-color 150ms;
    text-align: left;
}

.add-list-btn:hover {
    background-color: #242323;
}


@supports (display: grid) {
    .board-controls {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 1rem;
    }

    .lists-container {
        display: grid;
        grid-auto-columns: 20rem;
        grid-auto-flow: column;
        grid-column-gap: 1rem;
    }

    .board-info-bar,
    .board-controls .btn,
    .user-settings-btn {
        margin: 0;
    }
}
</style>