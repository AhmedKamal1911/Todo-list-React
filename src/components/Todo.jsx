import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../context/TodosContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
export default function Todo({ todo }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodosContext);
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (todo.id === t.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleShowModal() {
    setOpenDialog(true);
  }
  function handleCloseModal() {
    setOpenDialog(false);
  }
  function handleShowUpdateModal() {
    setOpenUpdateDialog(true);
  }
  function handleCloseUpdateModal() {
    setOpenUpdateDialog(false);
  }
  function handleConfirmUpdate() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      }
      return t;
    });
    setTodos(updatedTodos);
    setOpenUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleConfirmDelete() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

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
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
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
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal}>تراجع</Button>
          <Button onClick={handleConfirmUpdate}>تأكيد التعديل</Button>
        </DialogActions>
      </Dialog>
      {/* ===UPDATE Modal=== */}
      <Card
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          margin: "10px 0",
          transition: "0.3s",
          "&:hover": {
            padding: "15px 0px",
            boxShadow: "0px 10px 7px rgba(0,0,0,0.4)",
          },
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  fontWeight: "300",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  fontWeight: "100",
                  marginTop: "10px",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/* Actions Buttons */}
            <Grid xs={4} display="flex" gap="10px">
              {/* CHECK ICON BUTTON */}
              <IconButton
                aria-label="check"
                sx={{
                  "&:hover": {
                    backgroundColor: "#d3d3d3!important",
                    boxShadow: "0px 3px 7px rgba(0,0,0,0.4)",
                  },
                }}
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "green" : "white",
                  border: "solid #8bc34a 3px",
                  transition: "0.3s all",
                }}
                onClick={handleCheckClick}
              >
                <DoneRoundedIcon />
              </IconButton>
              {/* ====CHECK ICON BUTTON=== */}
              {/* EDIT BUTTON */}
              <IconButton
                onClick={handleShowUpdateModal}
                aria-label="edit"
                sx={{
                  "&:hover": {
                    backgroundColor: "#d3d3d3!important",
                    boxShadow: "0px 3px 7px rgba(0,0,0,0.4)",
                  },
                }}
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "3px solid #1769aa",
                  transition: "0.3s all",
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              {/* ===EDIT BUTTON=== */}
              {/* Delete Button */}
              <IconButton
                aria-label="delete"
                sx={{
                  "&:hover": {
                    backgroundColor: "#d3d3d3!important",
                    boxShadow: "0px 3px 20px rgba(0,0,0,0.4)",
                  },
                }}
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "3px solid #b23c17",
                  transition: "0.3s all",
                }}
                onClick={handleShowModal}
              >
                <DeleteIcon />
              </IconButton>
              {/* ===Delete Button=== */}
            </Grid>
            {/* ====Actions Buttons==== */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
