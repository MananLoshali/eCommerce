import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Product from "../Components/Product";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
`;

const Outer = styled.div`
  width: 100%;
`;
const Heading = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Times New Roman", Times, serif;
  padding: 10px;
`;

const WishList = () => {
  const { wishlistProduct } = useSelector((state) => state.user);
  console.log(wishlistProduct);

  return (
    <Outer>
      <Heading>Wishlist Products</Heading>
      <Container>
        {wishlistProduct.map((item) => (
          <Product item={item} wishlist="true" />
        ))}
      </Container>
    </Outer>
  );
};

export default WishList;
