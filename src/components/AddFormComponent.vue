<template>
  <div>
    <form class="flex gap-4 items-end justify-center">
      <div>
        <p class="text-lg font-bold">Add Todo {{ user.displayName }}</p>
        <input
          type="text"
          v-model="myTodo.title"
          class="border-2 border-gray-300 p-2 rounded-lg"
          placeholder="Add a todo"
        />
      </div>
      <div
        @click="addTodo"
        class="bg-green-500 cursor-pointer text-white py-2 px-[45px] rounded-lg duration-300 hover:bg-green-700"
      >
        Add
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getAuth, User } from "@firebase/auth";
import { Ref, ref } from "vue";
import { useTodoStore } from "../store/todoStore";
import { Todo } from "../types/todoType";

const auth = getAuth();
const user: Ref<User> = ref(auth.currentUser!);
const myTodo: Ref<Todo> = ref({
  title: "",
  completed: false,
});

const todoStore = useTodoStore();

const addTodo = () => {
  if (myTodo.value.title.length > 0) {
    todoStore.addTodo({
      title: myTodo.value.title,
      completed: false,
    });
    myTodo.value.title = "";
  }
};
</script>

<style scoped></style>
