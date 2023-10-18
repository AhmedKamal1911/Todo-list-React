import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodosProvider from "./context/TodosContext";
import { ToastProvider } from "./context/ToastContext";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <TodosProvider>
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
            <TodoList />
          </div>
        </TodosProvider>
        {/* second child of toast provider */}
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
