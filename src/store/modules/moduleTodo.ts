import { Module } from "vuex"
import axios from "axios"

import { RootState } from "../index"
import TodoItem from "@/types/TodoItem"
import http from "@/common/http-common"

export interface ModuleTodoState {
    todoItems: TodoItem[];
}

export const moduleTodo: Module<ModuleTodoState, RootState> = {
    namespaced: true,
    state: () => ({
        todoItems: []
    }), //state
    actions: {
        loadTodoItems({ commit }) {
            http
                .get('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.error(error?.response?.status +
                            ' : ' + error.message)
                    } else {
                        console.error(error);
                    }
                });
        },
        removeTodo({ commit }, payload: TodoItem) {
            http
                .delete(`/todos/${payload.id}`)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        },
        addTodo({ commit }, payload: TodoItem) {
            http
                .post(`/todos`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        },
        toggleTodo({ commit }, payload: TodoItem) {
            http
                .patch(`/todos/${payload.id}`, payload)
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        },
        clearTodo({ commit }) {
            http
                .delete('/todos')
                .then(r => r.data)
                .then(items => {
                    commit('setTodoItems', items)
                })
        },
    },//actions
    mutations: {
        setTodoItems(state, items) {
            state.todoItems = items;
        },
        addTodo(state, todoItemStr: string) {
            const obj: TodoItem = { completed: false, item: todoItemStr };
            localStorage.setItem(todoItemStr, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeTodo(state, payload) {
            const { todoItem: { item }, index } = payload
            localStorage.removeItem(item);
            state.todoItems.splice(index, 1);
        },
        toggleTodo(state, payload) {
            const { todoItem: { item, completed }, index } = payload
            state.todoItems[index].completed = !completed
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        },
        clearTodo(state) {
            localStorage.clear()
            state.todoItems = []
        }
    },
}
