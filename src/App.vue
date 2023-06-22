<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput></TodoInput>
    <TodoList :propsdata="todoItems"></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue';
import TodoHeader from '@/components/TodoHeader.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';
import TodoFooter from '@/components/TodoFooter.vue';
import TodoItem from '@/types/TodoItem'

export default defineComponent({
  name: 'App',
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },
  setup() {
    const todoItems = reactive<TodoItem[]>([]);

    onBeforeMount(() => {
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          const storageKey = localStorage.key(i) as string;
          const itemJson = localStorage.getItem(storageKey) as string | null;
          if (itemJson) {
            todoItems.push(JSON.parse(itemJson));
          } //if
        } //for
      } //if
    });

    return { todoItems };
  }, //setup
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
