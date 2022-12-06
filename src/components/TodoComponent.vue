<template>
  <div @click="markAsCompleted">
    <div
      :class="`flex gap-8 m-2 items-center border-solid border-2 rounded-lg p-4 cursor-pointer hover:bg-slate-300 duration-300 ${
        todo.completed ? 'border-green-500' : ' border-black'
      }`"
    >
      <p class="text-2xl">{{ todo.completed ? "🤪" : "😡" }}</p>
      <p class="font-medium">{{ todo.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "../store/todoStore";
import { Todo } from "../types/todoType";

const props = defineProps<{
  todo: Todo;
}>();
const todoStore = useTodoStore();

const markAsCompleted = () => {
  todoStore.toggleTodo(props.todo);
};
</script>

<style scoped></style>
