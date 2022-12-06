<template>
  <div class="bg-slate-100 min-h-screen">
    <div class="flex w-full justify-center">
      <button
        v-if="!user"
        @click="signIn"
        class="font-semibold p-4 m-8 shadow-md rounded-md bg-white"
      >
        Sign In With Google
      </button>
      <button
        v-else
        @click="signOut"
        class="font-semibold p-4 m-8 shadow-md rounded-md bg-red-500 text-white"
      >
        Sign out
      </button>
    </div>
    <div v-if="user" class="pt-10">
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
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "@firebase/auth";
import { storeToRefs } from "pinia";
import { ref, Ref } from "vue";
import AddFormComponent from "./components/AddFormComponent.vue";
import TodoComponent from "./components/TodoComponent.vue";
import { useTodoStore } from "./store/todoStore";

const { todos } = storeToRefs(useTodoStore());

const auth = getAuth();

const user: Ref<User | null> = ref(auth.currentUser);

const signIn = () => {
  signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
    user.value = result.user;
  });
};

const signOut = () => {
  auth.signOut().then(() => {
    user.value = null;
  });
};
</script>

<style scoped></style>
