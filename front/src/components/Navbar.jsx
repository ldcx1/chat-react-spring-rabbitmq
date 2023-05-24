import styled from "@emotion/styled";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { Box } from "@mui/system";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const StyledBar = styled(AppBar)({
  backgroundColor: "#1f1f1f",
});
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const StyledButton = styled(Button)({
  color: "white",
  borderColor: "white",
});
function Navbar(props) {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(logout());
    navigate("/");
  }
  return (
    <StyledBar position="sticky">
      <StyledToolbar>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <EnergySavingsLeafIcon sx={{ color: "green" }} />
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
                textDecoration: "none",
              }}
            >
              Queued Messenger
            </Typography>
          </Box>
        </Link>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "2vw",
          }}
        >
          {state === null && (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <StyledButton variant="outlined" startIcon={<LoginIcon />}>
                Log in
              </StyledButton>
            </Link>
          )}
          {state && (
            <>
              <StyledButton
                variant="outlined"
                startIcon={<LoginIcon />}
                onClick={handleClick}
              >
                Log out
              </StyledButton>

            </>
          )}
        </Box>
      </StyledToolbar>
    </StyledBar>
  );
}

export default Navbar;
