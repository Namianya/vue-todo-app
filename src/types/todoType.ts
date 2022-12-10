import { Timestamp } from "@firebase/firestore";

export interface Todo {
  title: string;
  completed: boolean;
  createdAt: Timestamp;
  userId: string;
}
