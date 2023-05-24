import { Box, Button, TextField, Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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

function GroupModal(Props) {

  // const [author, setAuthor] = useState("");
  const author = useSelector((state) => state.user);
  // console.log(author,"AUTHOR AUTHOR AUTHOR")
  const [username, setGroupName] = useState("");
  const [groupmembers, setGroupMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState([]);

  function fetchData() {
    const URL = `http://localhost:8080/users`;

    axios
      .get(URL)
      .then((res) => {
        let usersAux = [];
        console.log(res.data[0])
        for (const user of res.data) {
          if (user.id !== author.id && (user.groupmembers === "" || user.groupmembers === null))
          {
            usersAux.push(user);
          }
        }
        setUsers(usersAux);
      })
      .catch((err) => {
        // Handle errors
        alert("Error fetching users");
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChangeUsername(event) {
    setGroupName(event.target.value);
  }

  const handleCheck = (event) => {
      let updatedList = [...checked];
      console.log(updatedList,"INAINTE")
      if (event.target.checked) {
        updatedList = [...checked, parseInt(event.target.value)];
      console.log(updatedList,"DUPA")

      } else {
        updatedList.splice(checked.indexOf(parseInt(event.target.value)), 1);
      }
      setChecked(updatedList);
    };

  function handleSubmit(event) {
    event.preventDefault();
    var checkedItems = checked.length

    if (checkedItems.length === 0) {
        alert("Select members");
    } else {
        let ids = [];
        console.log(checked,"SUBMIT")
        for (const c of checked)
            ids.push(c);
        ids.push(author.id);
        console.log(ids)
        alert(JSON.stringify(ids))

        let user = {
          username: username,
          userpassword: "",
          groupmembers: JSON.stringify(ids)
        };
      axios
        .post("http://localhost:8080/user", user)
        .then(alert("Group created successfully"));
      }
  }

  const isChecked = (item) =>
   checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <Box sx={style}>
      <Typography variant="h3">Create group</Typography>

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
            label="Group name"
            autoComplete="off"
            value={username}
          />
          <div className="checkList">
            <div className="title">Your CheckList:</div>
            <div className="list-container">
              {users.map((item, index) => (
               <div key={index}>
                 <input value={item.id} type="checkbox" onChange={handleCheck} />
                 <span sx={isChecked(item)? "text-decoration: line-through": ""}>{item.username}</span>
               </div>
              ))}
            </div>
          </div>
          <Button type="submit" variant="contained" startIcon={<PublishIcon />}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default GroupModal;