<template>
    <span class="error">
        {{ $props.message }}
    </span>
</template>

<script>
export default {
    name: "ErrorSpan",

    props: {
        message: {
            type: String,
            default: "Algo anesperado aconteceu, tente novamente mais tarde"
        }
    },

    data() {
        return {

        }
    }
}
</script>


<style scoped>
span.error {
    background-color: rgba(235, 28, 28, 0.845);
    font-weight: bold;
    font-size: 20px;
    border: solid 2px;
    border-radius: 10px;
    text-align: center;
    padding: 0.5em;
    margin: 0.5em auto;
}
</style>