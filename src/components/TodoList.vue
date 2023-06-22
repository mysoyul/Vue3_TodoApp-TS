<template>
    <div>
        <ul>
            <li v-for="(item,idx) in todoItems" v-bind:key="idx">
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

<style scoped></style>