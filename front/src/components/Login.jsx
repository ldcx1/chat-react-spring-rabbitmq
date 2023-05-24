import React, { useEffect, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Navbar from "./Navbar";
import PublishIcon from "@mui/icons-material/Publish";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveUser } from "../redux/userSlice";
import UserModal from "./UserModal";
import { Modal } from "@mui/material";

function Login() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [user, setUser] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
    setUser({});
  };
  const handleClose = () => setOpen(false);

  const [username, setUsername] = useState("");
  const [psw, setPsw] = useState("");

  const navigate = useNavigate();

  const userRef = useRef();
  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }
  function handleChangePsw(event) {
    setPsw(event.target.value);
  }
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const URL = `http://localhost:8080/user/` + username + `/` + psw;

    axios
      .get(URL)
      .then((res) => {
        dispatch(saveUser(res.data));
        navigate("/chat");
      })
      .catch((err) => {
        alert("Username or psw wrong");
      });
  };
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60vw",
          margin: "10vh 15vw",
          borderRadius: "10px",
          padding: "10vh 5vw",
          alignContent: "center",
          textAlign: "center",
          gap: "5vh",
          boxShadow: "0 2px 20px rgb(0 0 0 / 0.2)",
        }}
      >
        <Typography variant="h2" component="h2">
          Log in
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5vh",
            }}
          >
            <TextField
              onChange={handleChangeUsername}
              required
              id="username"
              label="Username"
              ref={userRef}
              autoComplete="off"
              value={username}
            />
            <TextField
              onChange={handleChangePsw}
              required
              id="psw"
              label="Password"
              value={psw}
              type="password"
              autoComplete="off"
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<PublishIcon />}
            >
              Submit
            </Button>
          </Box>
        </form>
        <Button
              startIcon={<PublishIcon />}
              onClick={handleOpen}
            >
              Register
        </Button>
        <Modal open={open} onClose={handleClose}>
            <UserModal update={user} />
        </Modal>
      </Box>
    </Box>
  );
}

export default Login;
