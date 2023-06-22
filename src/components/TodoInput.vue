<template>
    <div class="inputBox shadow">
        <input type="text" autofocus :value="newTodoItem" @input="handleInput" @keyup.enter="addTodo">
        <span class="addContainer" @click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newTodoItem = ref("")

const emit = defineEmits(["input:todo","add:todo"])

const handleInput = (event: Event) => {
    const todoText = (event.target as HTMLInputElement).value
    if (!todoText) return
    emit("input:todo", todoText)
    newTodoItem.value = todoText
}

const addTodo = () => {
    const todoItem = newTodoItem.value
    if (todoItem !== "") {
        emit('add:todo', todoItem)
        clearInput()
    }
}

const clearInput = () => {
    newTodoItem.value = ""
}

</script>

<style scoped>
input:focus {
    outline: none;
}

i,span {
    cursor: pointer;
}

.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}

.inputBox input {
    border-style: none;
    font-size: 0.9rem;
    width: 80%;
}

.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}

.addBtn {
    color: white;
    vertical-align: middle;
}
</style>