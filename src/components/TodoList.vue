<template>
    <div>
        <TransitionGroup name="list" tag="ul">
            <li v-for="(todoItem, idx) in todoItems" :key="idx">
                <i class="fas fa-check checkBtn" :class="{ checkBtnCompleted: todoItem.completed }" 
                    @click="toggleComplete(todoItem, idx)"></i>
                <span :class="{ textCompleted: todoItem.completed }">
                    {{ todoItem.item }}
                </span>
                <span class="removeBtn" @click="removeTodo(todoItem, idx)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from "vuex"

import TodoItem from '@/types/TodoItem'

const store = useStore()
const todoItems = computed(() => store.state.todoItems)

const removeTodo = (todoItem: TodoItem, index: number) => {
    //emit('remove:todo', todoItemStr, index)
    store.commit("removeTodo", {todoItem, index} )
}

const toggleComplete = (todoItem: TodoItem, index: number) => {
    //emit('toggle:todo', todoItem, index)
    store.commit("toggleTodo", {todoItem, index})
}

</script>

<style scoped>
i,span {
    cursor: pointer;
}

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
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>