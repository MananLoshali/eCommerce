import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { Navigate, useLocation } from "react-router-dom";

import { publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Components/Product";

const Box = styled.div`
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  padding: 50px;
  width: 100%;
  display: flex;
`;

const Left = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0px 50px;
  gap: 20px;
`;
const Heading = styled.p`
  font-weight: bold;
  font-size: xx-large;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 28px;
`;

const Amount = styled.p`
  font-size: larger;
  font-weight: 400;
  font-size: 2rem;
`;
const Filter1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColorContainer = styled.div`
  flex: 1;
  display: flex;
`;

const FilterHeading = styled.p`
  font-size: medium;
  font-weight: 200;
`;

const FilterColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  margin-left: 1rem;
`;

const SizeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Size = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const SizeOption = styled.option``;

const QuantityContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Quantity = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  width: 25px;
  height: 25px;
  border-radius: 20%;
  border: 1px solid blue;
`;

const ButtonContainer = styled.button`
  margin-right: 180px;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const Outer = styled.div`
  width: 100vw;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
`;

const Headings = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Times New Roman", Times, serif;
  padding: 10px;
`;

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [goto, setGoto] = useState(false);
  const [product, setProduct] = useState({});
  const [recProduct, setRecProduct] = useState([]);
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("yellow");
  const [size, setSize] = useState("M");
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.cart);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get(`/products/${id}`);
        setProduct(res.data);
        setCategory(res.data.title);
      } catch (error) {
        if (error.response.status === 401) {
          setGoto(true); //if user is not signed in so redirect to the sigin page
        }
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    // const getRecPro = async (arr) => {
    //   const res = await publicRequest.get(
    //     `/products/?category=${arr && arr[0]}`
    //   );
    //   setRecProduct(res.data);
    // };
    // getRecPro(pro);
    const getRecPro = async () => {
      const res = await publicRequest.get(`/products/?category=${category}`);
      setRecProduct(res.data);
    };
    getRecPro();
  }, [category]);

  const handleQuantity = (type) => {
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity > 0 ? quantity - 1 : quantity);
    }
  };

  const handleClick = () => {
    //update cart
    // dispatch(addProduct({ ...product, quantity, color, size }));
    const promise = new Promise(
      dispatch(addProduct({ ...product, quantity, color, size }))
    );
    promise.then(() => {
      updateCart();
    });
  };

  const updateCart = async () => {
    console.log(products);
  };

  if (goto) {
    return <Navigate to="/signin" />;
  }

  return (
    <Box>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Left>
          <Image src={product.img} />
        </Left>
        <Right>
          <Heading>{product.title}</Heading>
          <Description>{product.desc}</Description>
          <Amount>${product.price}</Amount>
          <Filter1>
            <ColorContainer>
              <FilterHeading>Color</FilterHeading>
              {product.color?.map((c) => (
                <FilterColor key={c} color={c} onClick={() => setColor(c)} />
              ))}
            </ColorContainer>
            <SizeContainer>
              <FilterHeading>Size</FilterHeading>
              <Size onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <SizeOption key={s}>{s}</SizeOption>
                ))}
              </Size>
            </SizeContainer>
          </Filter1>
          <Filter1>
            <QuantityContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />

              <Quantity>{quantity}</Quantity>

              <AddIcon onClick={() => handleQuantity("inc")} />
            </QuantityContainer>
            <ButtonContainer>
              <Button onClick={handleClick}>Add To Cart</Button>
            </ButtonContainer>
          </Filter1>
        </Right>
      </Wrapper>

      {recProduct && (
        <Outer>
          <Headings>Similiar Products:</Headings>
          <Container>
            {recProduct?.map((items) => (
              <Product item={items} />
            ))}
          </Container>
        </Outer>
      )}
      <Newsletter />
      <Footer />
    </Box>
  );
};

export default SingleProduct;
