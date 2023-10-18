import { v4 as uuidv4 } from "uuid";
import {
  ADDED,
  CHECKED,
  CONFIRM_DELETE,
  GET,
  CONFIRM_UPDATE,
} from "./todosConstants";
export default function reducer(currentTodos, action) {
  switch (action.type) {
    case ADDED: {
      if (action.payload.title !== "") {
        const newTodos = [
          ...currentTodos,
          {
            title: action.payload.title,
            id: uuidv4(),
            details: "",
            isCompleted: false,
          },
        ];
        localStorage.setItem("todos", JSON.stringify(newTodos));
        return newTodos;
      }
      break;
    }

    case CONFIRM_DELETE: {
      const updatedTodos = currentTodos.filter(
        (t) => t.id !== action.payload.dialogTodo.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case CONFIRM_UPDATE: {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      console.log(updatedTodos);
      return updatedTodos;
    }

    case CHECKED: {
      const updatedTodos = currentTodos.map((t) => {
        if (action.payload.todo.id === t.id) {
          return {
            ...action.payload.todo,
            isCompleted: !action.payload.todo.isCompleted,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case GET: {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }

    default: {
      throw new Error("Unknown Action " + action.type);
    }
  }
}
