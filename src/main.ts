import { initializeApp } from "firebase/app";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "./assets/index.css";
import { firebaseConfig } from "./firebase/int";

const pinia = createPinia();

const firebaseapp = initializeApp(firebaseConfig);
getAuth(firebaseapp);
getFirestore(firebaseapp);

const app = createApp(App);
app.use(pinia);

app.mount("#app");
