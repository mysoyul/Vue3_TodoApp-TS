<template>
    <div>
        <ul>
            <li v-for="(todoItem, idx) in todoItems" :key="idx">
                {{ todoItem.item }}
                <span class="removeBtn" @click="removeTodo(todoItem.item, idx)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import TodoItem from '../types/TodoItem';

const todoItems = ref<TodoItem[]>([])

//life cycle hook
onBeforeMount(() => {
    console.log('mounted in the composition api!')
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i) as string
            const itemJson = localStorage.getItem(storageKey);
            todoItems.value.push(JSON.parse(itemJson as string))
        }
    }
    console.log(todoItems.value)
})

const removeTodo = (todoItem: string, index: number) => {
    localStorage.removeItem(todoItem)
    todoItems.value.splice(index, 1)
}

</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}

.removeBtn {
    margin-left: auto;
    color: #de4343;
}

.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}

.checkBtnCompleted {
    color: #b3adad;
}

.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
</style>