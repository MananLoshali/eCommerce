import React from "react";
import { useSelector } from "react-redux";
import Product from "../Components/Product";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Outer = styled.div`
  overflow-x: hidden;
`;

const Container = styled.div`
  overflow-x: hidden;
  width: 100vw;

  display: flex;
  flex-wrap: wrap;
`;

const Heading = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Times New Roman", Times, serif;
  padding: 10px;
`;

const Error = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Times New Roman", Times, serif;
  padding: 10px;
  text-align: center;
  margin: 30px 0px;
`;

const Text = styled.p`
  font-size: 1.4rem;
  text-align: center;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  margin: 10px 0px 20px 0px;
  font-weight: bolder;
`;

const SearchProduct = () => {
  const { searchedProduct, searchError, msg } = useSelector(
    (state) => state.user
  );
  const product = searchedProduct.data;

  const location = useLocation();
  const data = location.pathname.split("/")[2];
  return (
    <>
      <Navbar />
      {searchError ? (
        <Error>{msg}</Error>
      ) : (
        <Outer>
          <Heading>Showing result of {data}:</Heading>
          <Container>
            {product?.map((item) => (
              <Product item={item} key={item._id} />
            ))}
          </Container>
          <Text>That's all my friend ....</Text>
        </Outer>
      )}
      <Footer />
    </>
    // <Outer>
    //   <Heading>Showing result of Men</Heading>
    //   <Container>
    //     {product?.map((item) => (
    //       <Product item={item} key={item._id} />
    //     ))}
    //   </Container>
    // </Outer>
  );
};

export default SearchProduct;
