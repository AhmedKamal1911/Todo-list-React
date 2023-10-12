import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Todo from "./Todo";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/system/Unstable_Grid/Grid";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { useState } from "react";

export default function TodoList({
  handleAddClick,
  titleInput,
  setTitleInput,
}) {
  const { todos } = useContext(TodosContext);
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  function changeDisplayedTodosType(e) {
    setDisplayedTodosType(e.target.value);
  }
  // TODOS FILTERATION
  const completedTodos = todos.filter((t) => t.isCompleted);

  const notCompletedTodos = todos.filter((t) => !t.isCompleted);
  let renderedTodos = todos;
  if (displayedTodosType === "completed") {
    renderedTodos = completedTodos;
  } else if (displayedTodosType === "not-completed") {
    renderedTodos = notCompletedTodos;
  }
  const todosJsx = renderedTodos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          minWidth: 275,
          padding: "10px",
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "400" }}>
            مهامي
          </Typography>
          <Divider />
        </CardContent>
        {/* Filter Buttons */}
        <ToggleButtonGroup
          style={{ direction: "ltr", marginTop: "25px" }}
          color="primary"
          value={displayedTodosType}
          exclusive
          onChange={(e) => changeDisplayedTodosType(e)}
          aria-label="Platform"
        >
          <ToggleButton value="not-completed">غير منجز</ToggleButton>
          <ToggleButton value="completed">منجز</ToggleButton>
          <ToggleButton value="all">الكل</ToggleButton>
        </ToggleButtonGroup>
        {/* ====Filter Buttons==== */}
        {/* All Todos */}
        {todosJsx}
        {/* =====All Todos===== */}
        {/* INPUT  + ADD BUTTON*/}
        <Grid container marginTop="20px" spacing={2}>
          <Grid xs={8}>
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              style={{ width: "100%" }}
              onChange={(e) => setTitleInput(e.target.value)}
              value={titleInput}
            />
          </Grid>

          <Grid xs={4}>
            <Button
              style={{ width: "100%", height: "100%" }}
              variant="contained"
              color="primary"
              onClick={() => {
                handleAddClick();
              }}
            >
              اضف
            </Button>
          </Grid>
        </Grid>
        {/* ====INPUT  + ADD BUTTON====*/}
      </Card>
    </Container>
  );
}
