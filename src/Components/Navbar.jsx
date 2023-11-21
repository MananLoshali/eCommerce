import React, { useState } from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../responsive";
// import { publicRequest } from "../requestMethods";
import { searchProduct } from "../redux/apiCalls";

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
  transition: all 1s;
  &:hover {
    scale: 1.2;
  }
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
const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  background-color: white;
`;

const SerachBtnContainer = styled.button`
  border: none;
  background-color: white;
`;

const Navbar = () => {
  const [input, setInput] = useState("");
  // const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  // const userName =  user.username.charAt(0).toUpperCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await publicRequest.get(`/products/?category=${input}`);
    // const data = res.data;
    // setData(await res.data);
    searchProduct(dispatch, { input });
    navigate(`/searchproduct/${input}`);
  };

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
              <Link to="/myaccount" style={{ textDecoration: "none" }}>
                <TextContainer>
                  <AccountCircleOutlinedIcon
                    style={{
                      cursor: "pointer",
                      color: "cadetblue",
                      fontSize: 30,
                    }}
                  />
                  <Text>Profile</Text>
                </TextContainer>
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
          <SearchContainer onSubmit={(e) => handleSubmit(e)}>
            <Search
              type="text"
              value={input}
              placeholder="Search here"
              onChange={(event) => {
                setInput(event.target.value);
              }}
            ></Search>
            <SerachBtnContainer type="submit">
              <SearchOutlinedIcon
                sx={{
                  ":active": { transform: "rotate(-360deg)" },
                }}
                style={{
                  color: "gray",
                  fontSize: 25,
                  cursor: "pointer",
                  transition: "transform 1s",
                }}
              />
            </SerachBtnContainer>
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
