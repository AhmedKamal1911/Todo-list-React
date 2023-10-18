import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import { useTodosDispatch } from "../context/TodosContext";
import { useToast } from "../context/ToastContext";
import { CHECKED } from "../Reducers/todosConstants";

export default function Todo({ todo, showDelete, showUpdateDialog }) {
  const dispatch = useTodosDispatch();

  const showHideToast = useToast();

  function handleCheckClick() {
    dispatch({
      type: CHECKED,
      payload: {
        todo,
      },
    });
    showHideToast("تم التعديل");
  }

  function handleShowModal() {
    showDelete(todo);
  }

  function handleShowUpdateModal() {
    showUpdateDialog(todo);
  }

  return (
    <>
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
            <Grid md={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  fontWeight: "300",
                  width: "300px",
                  overflow: "hidden",
                  wordBreak: "break-word",
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
            <Grid md={4} display="flex" gap="10px">
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
