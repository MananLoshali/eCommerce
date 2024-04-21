import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { userRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";

const Box = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #f1e2e2;
`;

const Heading = styled.p`
  font-size: xx-large;
  font-weight: 500;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: darkmagenta;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  border-bottom: 2px solid black;
`;

const OrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const Order = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Text = styled.div`
  font: 1rem;
`;
const Orders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState();
  const id = location.pathname.split("/")[2];
  console.log(id);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/${id}`);
        setOrders(res);
        console.log(orders);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [id]);

  return (
    <>
      <Navbar />
      <Box>
        <Heading>Your Orders are here</Heading>
        <OrdersContainer>
          {/* {ref.current.map((order) => (
            <Order>
              <Text>{order._id}</Text>
            </Order>
          ))} */}
        </OrdersContainer>
      </Box>
    </>
  );
};

export default Orders;
