import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import { userSelector } from "./redux/userSlice";
import background from "./resources/energy.jpeg";

function App() {
  // const state = useSelector(userSelector);
  //console.log(state.user);
  const state = useSelector((state) => state.user);

  return (
    <div className="App">
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "100% 100%",
        }}
      ></Box>
    </div>
  );
}

export default App;
