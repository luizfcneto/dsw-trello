<template>
    <div class="board_page_container">
        <Header v-show="isHeaderProfileReady" :is-logged="isLogged()" :user="user"></Header>
        <section class="board-info-bar">
            <div class="board-controls" v-show="isBoardListLoaded">
                <template v-if="!editingTitle && isBoardListLoaded">
                    <button v-show="isBoardListLoaded" class="board-title-btn" @click="startEditingTitle">
                        <h2> {{ board.title }}</h2>
                    </button>
                </template>
                <template v-else>
                    <input class="board-title-input" type="text" v-model.lazy="newBoardTitle" @blur="stopEditingTitle"
                        autofocus>
                </template>

                <!-- <button class="star-btn btn" aria-label="Star Board">
                    <i class="far fa-star" aria-hidden="true"></i>
                </button> -->
            </div>
        </section>

        <section class="lists-container">
            <BoardList @refresh-board-info="getBoardInfo" v-show="isBoardListLoaded"
                v-for="( list, index ) of  this.board.lists " :key="index" :list="list">
            </BoardList>
            <template v-if="!creatingList">
                <button class="add-list-btn btn" @click="startCreatingList">Add a list</button>
            </template>
            <template v-else>
                <input class="board-list-input" type="text" v-model.lazy="newListTitle" @blur="stopCreatingList" autofocus>
            </template>
        </section>

    </div>
</template>

<script>
import Header from '../shared/Header.vue';
import BoardList from '../shared/BoardList.vue';
import { logout } from "../../services/logout.js";
import { getUserByToken, getBoardInfoAPI, updateBoardInfoAPI, createNewListAPI } from "../../services/api.js";

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
            isBoardListLoaded: false,
            editingTitle: false,
            creatingList: false,
            userToken: "",
            boardToken: "",

            user: {},
            board: {},
            newBoardTitle: "",
            newListTitle: "",

            updateBoardInfoRequest: {
                board: {
                    title: "",
                }
            },

            createListRequest: {
                list: {
                    title: "",
                    orderIndex: undefined
                }
            }
        }
    },

    watch: {
        'board.lists': {
            handler() {
                console.log("hanlder executado");
            },
            immediate: true,
            deep: true
        },

        async newBoardTitle(newValue) {
            if (newValue !== this.board.title) {
                console.log("Novo Titulo");
                this.updateBoardInfoRequest.board.title = newValue;
                console.log(this.updateBoardInfoRequest.board.title);

                await this.updateBoardInfo();
                await this.getBoardInfo();
            }
        },

        async newListTitle(newValue) {
            if (newValue) {
                console.log(this.board);
                this.createListRequest.list.orderIndex = this.board.lists.length + 1;
                this.createListRequest.list.title = newValue;
                await this.createNewList();
                await this.getBoardInfo();
                this.newListTitle = "";
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
                const { user } = await getUserByToken(this.userToken);
                this.user = user;
                this.isHeaderProfileReady = true;
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async getBoardInfo() {
            console.log("getBoardInfo executado");
            try {
                const response = await getBoardInfoAPI(this.userToken, this.boardToken);
                this.board = response.data.board;
                this.newBoardTitle = this.board.title;
                this.isBoardListLoaded = true;
            } catch (error) {
                console.error(error.name, error.message);
            }
        },

        async updateBoardInfo() {
            console.log("updateBoardInfo executed");
            try {
                const response = await updateBoardInfoAPI(this.userToken, this.boardToken, this.updateBoardInfoRequest);
                console.log(response);

            } catch (error) {
                console.log(error.name, error.message);
            }
        },

        async createNewList() {
            try {
                console.log(this.createListRequest);
                await createNewListAPI(this.userToken, this.boardToken, this.createListRequest);
                await this.getBoardInfo();
            } catch (error) {
                console.log(error.name, error.message);
            }
        },

        startEditingTitle() {
            console.log("startEditingTitle chamado");
            this.editingTitle = true;
        },
        stopEditingTitle() {
            console.log("stopEditinTitle chamado");
            this.editingTitle = false;
        },
        startCreatingList() {
            console.log("startCreatingList executed");
            this.creatingList = true;
        },
        stopCreatingList() {
            console.log("stopCreatingList executed");
            this.creatingList = false;
        },

        orderLists() {
            this.board.list.sort((current, next) => next.orderIndex > current.orderIndex);
        }

    },

    async created() {
        if (!this.isLogged()) {
            logout(this.$root);
        }

        if (this.isLogged()) {
            this.userToken = this.$root.credentials.token;
            this.boardToken = this.$route.params.boardId;
            await this.getUserInfo();
            await this.getBoardInfo();
        }
    },

    // updated: {
    //     orderedListsByIndex() {
    //         return this.board.lists.sort((current, next) => current.orderIndex - next.orderIndex);
    //     }
    // }

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

.board-title-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font: inherit;
    background: none;
    border: none;
    color: inherit;
    padding: 0;
    cursor: pointer;
    margin: 1em 0;
}

.board-title-btn:hover {
    background-color: #333;
}

.board-title-btn h2 {
    font-size: 1.8rem;
    font-weight: 700;
    white-space: nowrap;
}

.board-title-input {
    margin: 1em 0;
    font-size: 1.2rem;
    font-weight: 700;
    white-space: nowrap;
    width: 60%;
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

.board-list-input {
    flex: 0 0 20rem;
    display: block;
    font-size: 1.4rem;
    font-weight: 400;
    padding: 0.5rem;
    border-radius: 0.3rem;
    cursor: text;
    transition: background-color 150ms;
    text-align: left;
    background-color: #fff;
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