import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import Navbar from "./Navbar";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import axios from "axios";
import { Modal } from "@mui/material";
import GroupModal from "./GroupModal";
import PublishIcon from "@mui/icons-material/Publish";

const MyMessage = styled(Box)`
  color: black;
  border-radius: 5px;
  padding: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  box-shadow: 0 2px 20px rgb(0 0 0 / 20%);
`;
const YourMessage = styled(Box)`
  color: black;
  border-radius: 5px;
  padding: 20px;
  background-color: green;
  width: 300px;
  margin-left: 20px;
  color: white;
`;

const MyChatComponent = () => {
  const state = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [toUser, chooseUser] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [messages, setMessages] = useState([]);
  const [messageInput,setMessageInput] = useState("")
  const [client, setClient] = useState(null);


  function fetchData() {
    const URL = `http://localhost:8080/users`;

    axios
      .get(URL)
      .then((res) => {
        let usersAndGroups = []
        for(const user of res.data){
          if(user.id!==state.id){
            if(user.groupmembers === ""){
              usersAndGroups.push(user)
            }else{
              if(JSON.parse(user.groupmembers).includes(state.id)){
                usersAndGroups.push(user)
              }
            }
          }

        }
        console.log(usersAndGroups)
        setUsers(usersAndGroups);
        chooseUser(usersAndGroups[0].id)
        console.log(res.data);
      })
      .catch((err) => {
        // Handle errors
        alert("Error fetching users"+err);
      });
  }
  useEffect(() => {
    console.log("Aaa");
    fetchData();
  }, [open]);

  const handleChangeUser = (event) => {
    chooseUser(event.target.value);
  }

  function isGroup(id) {
    for (const x of users)
        if (x.id === id && x.groupmembers !== "")
            return true;
    return false;
  }
  function getGroupMembers(id) {
    for (const x of users)
        if (x.id === id)
            return JSON.parse(x.groupmembers);
    return [];
  }

  useEffect(() => {
    if(users!=null){
      if(client){
        client.disconnect();
      }
      const stompClient = Stomp.client('ws://127.0.0.1:61614/ws');
      setClient(stompClient);

      stompClient.connect({},() => {
        const subscription = stompClient.subscribe('/topic/message', handleMessage);

        return () => {
          subscription.unsubscribe();
          stompClient.disconnect();
        };
      });
    }

  }, [users]);

  const handleMessage = (message) => {
    let msg = JSON.parse(message.body);
         if (msg.to === state.id ) {
                 console.log("MSG FROM:",msg.from)
                 console.log("MSG TO:",msg.to)
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
         if(isGroup(msg.to) && msg.from!==state.id){
          console.log("de ce nu intra aici?")
           setMessages((prevMessages) => [...prevMessages, msg]);
          }
  }


  function sendMessage(message) {
    if (isGroup(toUser)) {
            client.send('/topic/message',{},
            JSON.stringify({
                 from: state.id,
                 to: toUser,
                 message: state.username + ":" + message
            }));
    } else {
        client.send('/topic/message',{},
            JSON.stringify({
                 from: state.id,
                 to: toUser,
                 message: message
            })
        );
    }
  }


  function handleSend(event) {
      setMessages((prevMessages) => [...prevMessages,{from: state.id,
        to: toUser,
        message: messageInput}]);
      sendMessage(messageInput);
      console.log(messages)
      setMessageInput("")
    }
  return (
    <Box>
    <Navbar />
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#3C6255",
          width: "15vw",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Users:</Typography>
        <Select
          labelId="dev-label"
          id="dev"
          value={toUser}
          label="User"
          onChange={handleChangeUser}
          required
        >
          {users.map((user) => (
            <MenuItem value={user.id}>{user.username}</MenuItem>
          ))}
        </Select>
        <Button
            startIcon={<PublishIcon />}
            onClick={handleOpen}
          >
            Create group
          </Button>
      </Box>
      <Box
        sx={{
          width: "85vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: "82vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          {messages && messages.map((msg,index) => ((msg.from === state.id && msg.to === toUser) ?
            <Box
                    key={index}
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row-reverse",
                      marginBottom: "10px",
                    }}
                  >
                    <MyMessage>{msg.message}</MyMessage>
                  </Box>
             : (((msg.from === toUser && msg.to === state.id) ||(isGroup(toUser) && msg.to === toUser) )?  (<Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              <YourMessage>{msg.message}</YourMessage>
            </Box>)
          :(""))))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "20px",
            alignItems: "center",
            padding: "2vh 1vw",
            boxShadow: "0 2px 20px rgb(0 0 0 / 20%)",
          }}
        >
          <SendIcon sx={{ color: "green" }} onClick={handleSend} />
          <TextField sx={{ width: "90%" }} autoComplete="off" onChange={(event)=>setMessageInput(event.target.value)} />
        </Box>
      </Box>
    </Box>
    <Modal open={open} onClose={handleClose}>
      <GroupModal />
    </Modal>
  </Box>
);
}


export default MyChatComponent;