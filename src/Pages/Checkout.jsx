import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.h4`
  font-size: 4rem;
  font-weight: 500;
  color: green;
`;
const Button = styled.button`
  width: 15%;
  padding: 10px;
  background-color: white;

  font-weight: 600;
`;

const Checkout = () => {
  return (
    <Container>
      <Text>Order Placed Successfully</Text>
      <Text>Order Placed Successfully</Text>

      <Button>
        <Link to="/" style={{ textDecoration: "none", color: "#33c9eb" }}>
          SHOP MORE
        </Link>
      </Button>
      <Button>
        <Link to="/" style={{ textDecoration: "none", color: "#33c9eb" }}>
          SHOP MORE
        </Link>
      </Button>
    </Container>
  );
};

export default Checkout;
