import { createContext, useReducer, useContext } from "react";
import TodosReducer from "../Reducers/TodosReducer";

export const TodosContext = createContext([]);
export const DispatchContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);

  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
export const useTodosDispatch = () => {
  return useContext(DispatchContext);
};
export default TodosProvider;
// fix createContext values
