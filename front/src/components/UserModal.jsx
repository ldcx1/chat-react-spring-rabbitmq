import { Box, Button, TextField, Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "5px solid green",
  borderRadius: "10px",
  boxShadow: 24,
  p: 10,
  display: "flex",
  flexDirection: "column",
  gap: "5vh",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
};
function UserModal(Props) {
  const [username, setUsername] = useState(Props.update.username);
  const [psw, setPsw] = useState(Props.update.password);

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }
  function handleChangePsw(event) {
    setPsw(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: username,
      userpassword: psw,
      groupmembers: ""
    };
    if (Props.update.id) {
      const URL = "http://localhost:8080/user/" + Props.update.id;
      axios.put(URL, user).then(alert("User updated succesfully"));
    } else {
      axios
        .post("http://localhost:8080/user", user)
        .then(alert("User added succesfully"));
    }
  }
  let message = "Add user";
  if (Props.update.username) {
    message = "Update user";
  }
  return (
    <Box sx={style}>
      <Typography variant="h3">{message}</Typography>

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
            autoComplete="off"
            value={username}
          />
          <TextField
            onChange={handleChangePsw}
            required
            id="psw"
            label="Password"
            value={psw}
            autoComplete="off"
          />
          <Button type="submit" variant="contained" startIcon={<PublishIcon />}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default UserModal;
