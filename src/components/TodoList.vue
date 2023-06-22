<template>
    <div>
        <ul>
            <li v-for="(item,idx) in todoItems" :key="idx">
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const todoItems = ref<string[]>([])

//life cycle hook
onBeforeMount(() => {
    console.log('mounted in the composition api!')
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i) as string
            todoItems.value.push(storageKey)
        }
    }
    console.log(todoItems.value)
})

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