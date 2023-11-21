import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Container = styled.div`
  overflow-x: hidden;
`;

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid black;
  align-items: center;
`;

const Image = styled.img`
  border: 2px solid greenyellow;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 50px;
  font-weight: bold;
  color: #49d7c4;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const Info = styled.p`
  font-size: 1.2rem;
  font-weight: 800;
  font-family: sans-serif;
  color: #e2ae03;
`;

const Button = styled.button`
  width: 20%;
  height: 8%;
  outline: none;
  border-radius: 10px;
  padding-top: 3px;
  background-color: #77ff00;
  color: green;
  border: none;
  box-shadow: #77ff00;
  font-weight: bold;
  font-size: larger;
  cursor: pointer;
`;
const Text = styled.p`
  font-size: xx-large;
  font-family: serif;
  color: #1977f2;
`;

const Account = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user._id);
  // const userName = user.username.charAt(0).toUpperCase();
  const userImage = user.image;
  const handleClick = () => {
    localStorage.removeItem("persist:root");
    window.location.reload();
  };
  return (
    <Container>
      <Navbar />
      <Box>
        <Text>YOUR PROFILE</Text>

        <ImageContainer>
          <Image src={userImage} />
        </ImageContainer>
        <InfoContainer>
          <Info>USER: {user.username}</Info>
          <Info>EMAIL: {user.email}</Info>
          <Info>
            <Link
              to={`/myorders/${user._id}`}
              style={{ textDecoration: "none" }}
            >
              Your orders
            </Link>
          </Info>
          <Info>
            <Link to="/wishlist" style={{ textDecoration: "none" }}>
              Wishlist
            </Link>
          </Info>
          <Info>
            <Link to="/editprofile" style={{ textDecoration: "none" }}>
              Edit Profile
            </Link>
          </Info>
          <Info>
            <Link to="/myorders" style={{ textDecoration: "none" }}>
              Your orders
            </Link>
          </Info>
          <Button onClick={handleClick}>Logout</Button>
        </InfoContainer>
      </Box>
    </Container>
  );
};

export default Account;
