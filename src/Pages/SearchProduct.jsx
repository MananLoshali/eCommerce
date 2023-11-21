import React from "react";
import { useSelector } from "react-redux";
import Product from "../Components/Product";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

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
      {searchError ? (
        <Error>{msg}</Error>
      ) : (
        <Outer>
          <Heading>Showing result of {data}</Heading>
          <Container>
            {product?.map((item) => (
              <Product item={item} key={item._id} />
            ))}
          </Container>
        </Outer>
      )}
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
