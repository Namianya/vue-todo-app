<template>
  <div>
    <div class="pt-10">
      <AddFormComponent />
      <div class="pt-20 px-10">
        <p class="text-lg font-bold">All Todos</p>

        <div>
          <TodoComponent v-for="(todo, index) in todos" :key="index" :todo="todo" />
          <p v-if="todos.length == 0" class="text-slate-500">No todos available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import AddFormComponent from "./components/AddFormComponent.vue";
import TodoComponent from "./components/TodoComponent.vue";
import { useTodoStore } from "./store/todoStore";

const { todos } = storeToRefs(useTodoStore());
</script>

<style scoped></style>
