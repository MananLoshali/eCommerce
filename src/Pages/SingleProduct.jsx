// import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Components/Product";
import { addToCart, placeOrder, updateCart } from "../redux/apiCalls";
import { mobile } from "../responsive";
// import { dotenv } from "dotenv";
const KEY =
  "pk_test_51P5DjySEzKBXhG3gR8EutNY2VgYGUJG4w1G1wQ8DfruLIQ3YKBjxT8ggBzVtnR3pK0fx0DJSGqRcSYyR7JcjnJHM00nfo5J7Gz";
// dotenv.config();
// const KEY = process.env.STRIPE_REACT_KEY;
const Box = styled.div`
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  padding: 50px;
  width: 100%;
  display: flex;
  ${mobile({ flexDirection: "column" })}
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
  ${mobile({ padding: "0px" })}
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
  display: block;
`;

const ColorWrapper = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.color};
  cursor: pointer;
  margin-left: 1rem;
  padding: 2px;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
  border: none;
  background-color: ${(props) => props.color};
  cursor: pointer;
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
  flex-wrap: wrap;
`;

const Headings = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Times New Roman", Times, serif;
  padding: 10px;
`;

const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 1;
`;

const SingleProduct = () => {
  console.log(KEY, "stripe key");
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [goto, setGoto] = useState(false);
  const [product, setProduct] = useState({});
  const [recProduct, setRecProduct] = useState([]);
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState(1);
  const [colors, setColor] = useState("yellow");
  const [size, setSize] = useState("M");
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser?._id);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/${id}`);
        setProduct(res.data);
        setCategory(res.data.title);
      } catch (error) {
        console.log(error);
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

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const orderedProduct = {
          productId: id,
          quantity: quantity,
          color: colors,
          size: size,
          amount: product.price,
        };
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: orderedProduct.amount * 100,
        });
        navigate("/checkout", {
          stripeData: res.data,
          products: orderedProduct,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, product.price, navigate]);

  const handleQuantity = (type) => {
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity > 0 ? quantity - 1 : quantity);
    }
  };

  const handleClick = () => {
    //update cart
    //dispatch(addProduct({ ...product, quantity, color, size }));

    const res = addToCart(dispatch, {
      userId,
      products: {
        productId: id,
        quantity: quantity,
        color: colors,
        size: size,
        amount: product.price,
      },
    });
    res
      .then((data) => {
        console.log(data, "data");
        if (data.response.status === 401) {
          setGoto(true); //if user is not signed in so redirect to the sigin page
        }
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        console.log("runs alaways");
      });
  };

  const handleOrder = () => {
    const orderedProduct = {
      productId: id,
      quantity: quantity,
      color: colors,
      size: size,
      amount: product.price,
    };
    placeOrder(dispatch, {
      userId,
      orderedProduct,
    });
    console.log(orderedProduct, "order");
  };

  const onToken = (token) => {
    setStripeToken(token);
    console.log(token);
  };

  if (goto) {
    console.log(goto);
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
                <ColorWrapper>
                  <FilterColor key={c} color={c} onClick={() => setColor(c)} />
                </ColorWrapper>
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
              <RemoveIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleQuantity("dec")}
              />
              <Quantity>{quantity}</Quantity>
              <AddIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleQuantity("inc")}
              />
            </QuantityContainer>
            <ButtonContainer>
              <Button color={"skyblue"} onClick={handleClick}>
                Add To Cart
              </Button>
              {stripeToken ? (
                <Loading> Processing. Please wait....</Loading>
              ) : (
                <StripeCheckout
                  name="Dholakpur"
                  image="https://avatars.githubusercontent.com/u/1486366?v=4"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${product.price * quantity}`}
                  amount={product.price * 100 * quantity}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button color={"yellow"}>Buy Now</Button>
                </StripeCheckout>
              )}
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
