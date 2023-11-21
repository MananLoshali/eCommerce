import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import backVideo from "../assests/backVid.webm";
import { mobile } from "../responsive";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #aa83aa;
  /* background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%; */
  position: relative;
`;

const Heading = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
`;

const Form = styled.form`
  width: 40%;
  height: 48%;
  border: 0.5px solid gray;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
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
  padding: 2px 4px;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

const Error = styled.span`
  color: red;
`;

const Button = styled.button`
  width: 14%;
  height: 15%;
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
const Para = styled.p`
  font-size: 1rem;
  color: #27b827;
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

const Text = styled.p`
  display: flex;
  width: 100%;
  justify-content: right;
  padding-right: 50px;
`;

const Signin = () => {
  const [errors, setErrors] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, msg } = useSelector((state) => state.user);

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
  console.log(error, msg);
  return (
    <Box>
      <Video playsInline autoPlay muted loop>
        <source src={backVideo} />
      </Video>
      <Form>
        <Heading>SignIn</Heading>
        <Input
          placeholder="enter username"
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors(false);
          }}
        ></Input>
        <Input
          placeholder="enter password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors(false);
          }}
        ></Input>

        <Text>
          <Link to="/changepassword" style={{ textDecoration: "none" }}>
            Forgot Password
          </Link>
        </Text>

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
        {/* {error && <Error> Something went wrong</Error>} */}
        {error ? (
          msg ? (
            <Error>{msg}</Error>
          ) : (
            <Error>Something went wrong</Error>
          )
        ) : (
          <></>
        )}

        <Para>
          New user ?? <Link to="/signup">Sign Up</Link>
        </Para>
      </Form>
    </Box>
  );
};

export default Signin;
