import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { changepassword } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aa83aa;
`;

const Heading = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
`;

const Form = styled.form`
  width: 40%;
  height: 50%;
  border: 0.5px solid gray;

  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid black;
  align-items: center;
  border-radius: 10px;
  background-color: #d2cbcb;
  opacity: 0.8;
  ${mobile({
    width: "80%",
    height: "60%",
  })}
`;

const Input = styled.input`
  width: 80%;
  height: 15%;
  padding: 8px;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 18%;
  height: 19%;
  font-size: 1.1rem;
  font-weight: bolder;
  background-color: #97e3ec;
  border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10%;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, redirect, error, msg } = useSelector(
    (state) => state.user
  );

  if (redirect) {
    navigate("/signin");
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setWarning("All fields are necessary");
      return;
    }

    if (password !== confirmPassword) {
      setWarning("Password not same");
      return;
    }

    changepassword(dispatch, { email, password });
  };
  return (
    <Box>
      <Form>
        <Heading>Change Password</Heading>
        <Input
          placeholder="enter email"
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
            setWarning("");
          }}
        />
        <Input
          placeholder="enter new password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setWarning("");
          }}
        />
        <Input
          placeholder="confirm new password"
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setWarning("");
          }}
        />
        <Button onClick={handleClick} disabled={isFetching ? true : false}>
          Change Password
        </Button>
        {warning && <Error>{warning}</Error>}

        {error ? (
          msg ? (
            <Error>{msg} </Error>
          ) : (
            <Error>Something went wrong</Error>
          )
        ) : (
          <></>
        )}
      </Form>
    </Box>
  );
};

export default ChangePassword;
