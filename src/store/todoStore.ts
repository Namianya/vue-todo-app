import { Todo } from './../types/todoType';
import {defineStore} from 'pinia'
import { Ref, ref } from 'vue'
export const  useTodoStore = defineStore('todoStore',()=>{
    const todos:Ref<Array<Todo>> = ref([])

    const addTodo = (todo:Todo) => { 
        todos.value.push(todo)
    }
    const removeTodo = (todo:Todo) => {
        const index = todos.value.indexOf(todo)
        todos.value.splice(index,1)
    }
    const toggleTodo = (todo:Todo) => {
        todo.completed = !todo.completed
    }
    return {
        todos,
        addTodo,
        removeTodo,
        toggleTodo
    }
})

