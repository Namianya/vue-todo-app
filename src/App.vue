<template>
  <div class="bg-slate-100 min-h-screen">
    <div class="flex w-full justify-center">
      <button
        v-if="!loggedInUser"
        @click="signIn"
        class="font-semibold p-4 m-8 shadow-md rounded-md bg-white"
      >
        Sign In With Google
      </button>
      <button
        v-else
        @click="signUserOut"
        class="font-semibold p-4 m-8 shadow-md rounded-md bg-red-500 text-white"
      >
        Sign out
      </button>
    </div>
    <div v-if="loggedInUser" class="pt-10">
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
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "@firebase/auth";
import { collection, getFirestore, onSnapshot, query, where } from "@firebase/firestore";
import { ref, Ref } from "vue";
import AddFormComponent from "./components/AddFormComponent.vue";
import TodoComponent from "./components/TodoComponent.vue";
import { Todo } from "./types/todoType";

// const { todos } = storeToRefs(useTodoStore());

const auth = getAuth();
const loggedInUser: Ref<User | null> = ref(auth.currentUser);

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedInUser.value = user;
    getTodos();
  } else {
    loggedInUser.value = null;
  }
});

const todos: Ref<Todo[]> = ref([]);
const firestore = getFirestore();
const coll = collection(firestore, "todos");
function getTodos() {
  const todosList: Todo[] = [];
  onSnapshot(query(coll, where("userId", "==", auth.currentUser!.uid)), (q) => {
    q.forEach((doc) => {
      todosList.push(doc.data() as Todo);
      console.table(doc.data() as Todo);
      todos.value = todosList;
    });
  });
}

const signIn = () => {
  signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
    loggedInUser.value = result.user;
  });
};

const signUserOut = () => {
  auth.signOut().then(() => {
    loggedInUser.value = null;
  });
};
</script>

<style scoped></style>
