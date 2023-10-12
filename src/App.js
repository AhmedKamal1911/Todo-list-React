import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./context/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#6a1b9a",
    },
  },
});
const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "سشبيشسبشبش",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة تاب",
    details: "سشبيشسبشبش",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function handleAddClick() {
    if (titleInput !== "") {
      const newTodos = [
        ...todos,
        {
          title: titleInput,
          id: uuidv4(),
          details: "",
          isCompleted: false,
        },
      ];

      setTodos(newTodos);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      setTitleInput("");
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <div
          className="App"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "#263238",
            direction: "rtl",
          }}
        >
          <TodoList
            handleAddClick={handleAddClick}
            setTitleInput={setTitleInput}
            titleInput={titleInput}
          />
        </div>
      </TodosContext.Provider>
    </ThemeProvider>
  );
}

export default App;
