import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
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
  height: 40%;
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
  height: 15%;
  padding: 2px 4px;
  &:focus {
    outline: none;
  }
`;
const Error = styled.span`
  color: red;
`;

const Button = styled.button`
  width: 10%;
  height: 17%;
  font-size: 1rem;
  font-weight: bolder;
  background-color: #97e3ec;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Para = styled.p`
  font-size: 1rem;
  color: orange;
`;
const Signin = () => {
  const [errors, setErrors] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrors(true);
      return;
    }
    console.log("Before login");
    login(dispatch, { username, password });
    console.log("after login");
    // window.location.reload();
  };
  console.log(error);
  return (
    <Box>
      <Form>
        <Heading>SignIn</Heading>
        <Input
          placeholder="enter username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></Input>
        <Input
          placeholder="enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>

        <Button
          sx={{
            border: "1px solid blue",
            "&:disabled": { color: "green", cursor: "not-allowed" },
          }}
          onClick={handleClick}
          disabled={isFetching}
        >
          SignIn
        </Button>

        {errors && <Error>All fields are necessary</Error>}
        {error && <Error> Something went wrong</Error>}
      </Form>
      <Para>
        New user ?? <Link to="/signup">Sign Up</Link>
      </Para>
    </Box>
  );
};

export default Signin;
