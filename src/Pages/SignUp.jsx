import { Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { register } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
`;
const Form = styled.form`
  width: 40%;
  height: 60%;
  border: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
  align-items: center;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 80%;
  height: 10%;
  padding: 2px 4px;
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
  color: orange;
`;
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");
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
    };
    register(dispatch, user);
  };

  return (
    <Box>
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
        <Input
          type="password"
          placeholder="enter password"
          onChange={(e) => {
            setPassword(e.target.value);
            setWarning("");
          }}
        ></Input>
        <Input
          type="password"
          placeholder="confirm password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setWarning("");
          }}
        ></Input>
        {warning.length > 1 && <Text>{warning}</Text>}

        <Button sx={{ border: "1px solid blue" }} onClick={handleClick}>
          SignUp
        </Button>
      </Form>
      <Para>
        Already a user ?? <Link to="/signin">Sign In</Link>
      </Para>
    </Box>
  );
};

export default SignUp;
