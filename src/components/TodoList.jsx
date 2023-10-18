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

import { useState, useMemo, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { useTodos, useTodosDispatch } from "../context/TodosContext";

// Dialog imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ADDED,
  CONFIRM_DELETE,
  CONFIRM_UPDATE,
  GET,
} from "../Reducers/todosConstants";

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState("null");
  const [titleInput, setTitleInput] = useState("");

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const showHideToast = useToast();
  useEffect(() => {
    dispatch({ type: GET });
  }, [dispatch]);

  // TODOS FILTERATION
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let renderedTodos = todos;
  if (displayedTodosType === "completed") {
    renderedTodos = completedTodos;
  } else if (displayedTodosType === "not-completed") {
    renderedTodos = notCompletedTodos;
  }

  // HANDLERS

  function handleAddClick() {
    dispatch({
      type: ADDED,
      payload: {
        title: titleInput,
      },
    });
    setTitleInput("");
    showHideToast("تمت الاضافة");
  }

  function handleConfirmDelete() {
    dispatch({
      type: CONFIRM_DELETE,
      payload: {
        dialogTodo,
      },
    });
    setOpenDialog(false);
    showHideToast("تم حذف المهمة");
  }

  function handleConfirmUpdate() {
    dispatch({
      type: CONFIRM_UPDATE,
      payload: dialogTodo,
    });
    setOpenUpdateDialog(false);
    showHideToast("تم التعديل");
  }
  function showDeleteDialog(todoObj) {
    setOpenDialog(true);
    setDialogTodo(todoObj);
  }

  function handleCloseModal() {
    setOpenDialog(false);
  }

  function changeDisplayedTodosType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function ShowUpdateModal(todoObj) {
    setDialogTodo(todoObj);
    setOpenUpdateDialog(true);
  }

  function handleCloseUpdateModal() {
    setOpenUpdateDialog(false);
  }

  const todosJsx = renderedTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={showDeleteDialog}
        showUpdateDialog={ShowUpdateModal}
      />
    );
  });

  return (
    <>
      {/* Delete Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleCloseModal}
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تأكيد الحذف"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل انت متأكد من انك تريد تأكيد الحذف ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>تراجع</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===Delete Modal=== */}
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
      {/* UPDATE Modal */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleCloseUpdateModal}
        open={openUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>تعديل</DialogTitle>
        <DialogContent>
          <DialogContentText>
            تستطيع من خلال هذه النافذة ان تقوم بالتعديل علي عنوان وتفاصيل المهمة
            الخاصة بك .
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="الوصف"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal}>تراجع</Button>
          <Button onClick={handleConfirmUpdate}>تأكيد التعديل</Button>
        </DialogActions>
      </Dialog>
      {/* ===UPDATE Modal=== */}
    </>
  );
}
