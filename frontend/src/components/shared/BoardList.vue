<template>
    <div class="list">
        <div class="list-title">
            <p> {{ list.title }} </p>
        </div>
        <ul class="list-items">
            <CardList v-for="(card, index) of list.cards" :key="index" :card="card"></CardList>
        </ul>
        <button class="add-card-btn btn">Add a card</button>
    </div>
</template>

<script>
import CardList from './CardList.vue';

export default {
    name: "BoardList",
    components: {
        CardList
    },
    props: {
        list: {
            type: Object,
            required: true
        }
    },

    data() {
        return {

        }
    },

    methods: {

    }
}
</script>

<style scoped>
/* Botões de adicionar elemento */
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

.add-card-btn {
    display: block;
    font-size: 1.4rem;
    font-weight: 400;
    color: #838c91;
    padding: 1rem;
    text-align: left;
    cursor: pointer;
}

.add-card-btn:hover {
    background-color: #cdd2d4;
    color: #4d4d4d;
    text-decoration: underline;
}

.add-card-btn::after,
.add-list-btn::after {
    content: '...';
}

/* Estilos das listas */
.list {
    flex: 0 0 20rem;
    display: flex;
    flex-direction: column;
    background-color: #e2e4e6;
    max-height: calc(100vh - 11.8rem);
    border-radius: 0.3rem;
    margin-right: 1rem;
}

.list:last-of-type {
    margin-right: 0;
}

.list-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    padding: 1rem;
}

.list-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: start;
    padding: 0 0.6rem 0.5rem;
    overflow-y: auto;
}

.list-items::-webkit-scrollbar {
    width: 1.6rem;
}

.list-items::-webkit-scrollbar-thumb {
    background-color: #c4c9cc;
    border-right: 0.6rem solid #e2e4e6;
}

.list-items li {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    background-color: #fff;
    padding: 0.65rem 0.6rem;
    color: #4d4d4d;
    border-bottom: 0.1rem solid #ccc;
    border-radius: 0.3rem;
    margin-bottom: 0.6rem;
    word-wrap: break-word;
    cursor: pointer;
}

.list-items li:last-of-type {
    margin-bottom: 0;
}

.list-items li:hover {
    background-color: #eee;
}

@supports (display: grid) {
    .list {
        display: grid;
        grid-template-rows: auto minmax(auto, 1fr) auto;
    }

    .list-items {
        display: grid;
        grid-row-gap: 0.6rem;
    }

    .list,
    .list-items li,
    .btn {
        margin: 0;
    }
}
</style>