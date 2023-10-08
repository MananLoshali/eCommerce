import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { register } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import backVideo from "../assests/backVid.webm";
import { mobile } from "../responsive";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #aa83aa;
  /* background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%; */
`;

const Heading = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
`;
const Form = styled.form`
  width: 40%;
  height: 80%;
  border: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  background-color: #d2cbcb;
  opacity: 0.8;
  ${mobile({
    width: "90%",
  })}
`;

const Input = styled.input`
  width: 80%;
  height: 10%;
  padding: 2px 4px;
  border-radius: 10px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Inputi = styled.input`
  width: 100%;
  height: 25%;
  padding: 2px 4px;
  border-radius: 10px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  color: red;
`;

const Para = styled.p`
  font-size: 1rem;
  color: #27b827;
`;

const Container = styled.div`
  width: 80%;
  height: 40%;
  display: flex;
  justify-content: space-around;
`;
const Image = styled.img`
  width: 70%;
  height: 70%;
  border: 1px solid firebrick;
  opacity: 1;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 50%;
  object-fit: cover;
  ${mobile({
    width: "100%",
  })}
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [img, setImg] = useState();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setWarning("All fields are necessary");
      return;
    }
    if (password !== confirmPassword) {
      setWarning("Enter correct password");
      return;
    }
    const user = {
      username,
      email,
      password,
      img,
    };
    register(dispatch, user);
  };

  return (
    <Box>
      <Video playsInline autoPlay muted loop>
        <source src={backVideo} />
      </Video>
      <Form>
        <Heading>REGISTER</Heading>
        <Input
          type="string"
          placeholder="enter username"
          onChange={(e) => {
            setUsername(e.target.value);
            setWarning("");
          }}
        ></Input>
        <Input
          type="email"
          placeholder="enter email"
          onChange={(e) => {
            setEmail(e.target.value);
            setWarning("");
          }}
        ></Input>
        <Container>
          <Left>
            <Inputi
              style={{ cursor: "pointer" }}
              type="file"
              accept="images/*"
              onChange={(e) => {
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  console.log(reader.result);
                  setImg(reader.result);
                };
                reader.onerror = () => {
                  console.log(reader.error);
                };
                // setEmail(e.target.value);
                // setWarning("");
                console.log(e.target.files);
              }}
            ></Inputi>
            <Inputi
              type="password"
              placeholder="enter password"
              onChange={(e) => {
                setPassword(e.target.value);
                setWarning("");
              }}
            ></Inputi>
            <Inputi
              type="password"
              placeholder="confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setWarning("");
              }}
            ></Inputi>
          </Left>
          <Right>
            <Image src={img} />
          </Right>
        </Container>

        <Button sx={{ border: "1px solid blue" }} onClick={handleClick}>
          SignUp
        </Button>
        {warning.length > 1 && <Text>{warning}</Text>}

        <Para>
          Already a user ?? <Link to="/signin">Sign In</Link>
        </Para>
      </Form>
    </Box>
  );
};

export default SignUp;
