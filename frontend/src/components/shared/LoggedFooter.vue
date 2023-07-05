<template>
    <div class="container-footer">
        <p> &copy; {{ message }} </p>
    </div>
</template>


<script>
export default {
    name: "LoggedFooter",
    data() {
        return {
            message: "2023 DSW-Trello. Todos os direitos reservados."
        }
    }
}
</script>

<style>
.container-footer {
    width: 100%;
    background-color: #ccc;
    padding: 10px;
    text-align: center;
    position: fixed;
    bottom: 0;
}
</style>