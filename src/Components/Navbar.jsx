import React, { useState } from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 40px;
  background-color: #fdc968;
  /* position: fixed;
  top: 20;
  width: 100%;
  z-index: 999; */
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  ${mobile({ padding: "0px", justifyContent: "space-between" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile({})}
`;

const Middle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TextContainer = styled.div`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  ${mobile({})}
`;
const Text = styled.p`
  color: black;
  font-weight: 500;
  ${mobile({ display: "none" })}
`;
const Heading = styled.p`
  text-transform: uppercase;
  font-size: x-large;
  font-weight: 900;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  ${mobile({
    fontSize: "1rem",
    fontWeight: "100",
    textTransform: "capitalize",
  })}
`;
const Search = styled.input`
  height: 30px;
  border: none;
  padding-left: 8px;
  &:focus {
    outline: none;
  }
  ${mobile({ padding: "0px", width: "20px" })}
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
`;

const Navbar = () => {
  const [input, setInput] = useState("");

  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  // const userName =  user.username.charAt(0).toUpperCase();

  return (
    <Container>
      <Wrapper>
        <Left>
          {user ? (
            <>
              <Link to="/" style={{ textDecoration: "none" }}>
                <TextContainer>
                  <HomeOutlinedIcon /> <Text>Home</Text>
                </TextContainer>
              </Link>
              <Link to="/myaccount">
                <AccountCircleOutlinedIcon
                  style={{
                    cursor: "pointer",
                    color: "cadetblue",
                    fontSize: 30,
                  }}
                />
              </Link>
            </>
          ) : (
            <>
              <Link to="/" style={{ textDecoration: "none" }}>
                <TextContainer>
                  <HomeOutlinedIcon /> <Text>Home</Text>
                </TextContainer>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <TextContainer>
                  <AppRegistrationOutlinedIcon /> <Text>Register</Text>
                </TextContainer>
              </Link>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <TextContainer>
                  <LoginOutlinedIcon /> <Text>Login</Text>
                </TextContainer>
              </Link>
            </>
          )}
        </Left>
        <Middle>
          <Heading>DholakPur</Heading>
        </Middle>
        <Right>
          <SearchContainer>
            <Search
              type="text"
              value={input}
              placeholder="Search here"
              onChange={(event) => {
                setInput(event.target.value);
              }}
            ></Search>
            <SearchOutlinedIcon
              style={{ color: "gray", fontSize: 25, cursor: "pointer" }}
            />
          </SearchContainer>

          <Link to="/cart">
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon
                style={{ cursor: "pointer", color: "tomato", fontSize: 30 }}
              />
            </Badge>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
