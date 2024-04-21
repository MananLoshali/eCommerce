// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";

import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import Newsletter from "../Components/Newsletter";
import { useEffect, useState } from "react";
import { getCart } from "../redux/apiCalls";
const KEY =
  "pk_test_51P5DjySEzKBXhG3gR8EutNY2VgYGUJG4w1G1wQ8DfruLIQ3YKBjxT8ggBzVtnR3pK0fx0DJSGqRcSYyR7JcjnJHM00nfo5J7Gz";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
`;
const Loading = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 1;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const { wishlistProductQuantity } = useSelector((state) => state.user);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getCart(dispatch, user._id);
  }, []);
  console.log(cart, "cart");

  const handleClick = () => {
    createOrder();
    dispatch(clearCart());
  };
  const onToken = (token) => {
    setStripeToken(token);
    console.log(token);
  };
  const createOrder = async () => {
    try {
      const res = await userRequest.post("/orders/create", {
        userId: user._id,
        products: cart.products.map((item) => ({
          productId: item._id,
          quantity: item.quntity,
        })),
        amount: cart.total,
        address: "Test address",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const orderedProduct = cart.products.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          color: item.colors,
          size: item.size,
          amount: item.price,
        }));
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        dispatch(clearCart());
        navigate("/checkout", {
          stripeData: res.data,
          products: orderedProduct,
        });
      } catch (error) {
        console.log(error, "cart error");
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              CONTINUE SHOPPING
            </Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag:({cart.totalQuantity})</TopText>
            <Link
              to="/wishlist"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <TopText>Your Wishlist ({wishlistProductQuantity})</TopText>
            </Link>
          </TopTexts>
          {stripeToken ? (
            <Loading> Processing. Please wait....</Loading>
          ) : (
            <StripeCheckout
              name="Dholakpur"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button color={"yellow"}> CHECKOUT NOW</Button>
            </StripeCheckout>
          )}
          {/* <TopButton type="filled" onClick={handleClick}>
            <Link
              to="/checkout"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              CHECKOUT NOW
            </Link>
          </TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    {/* <AddIcon /> */}
                    <ProductAmount>Quantity: {product.quantity}</ProductAmount>
                    {/* <RemoveIcon /> */}
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.amount * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleClick}>
              <Link
                to="/checkout"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                ORDER NOW
              </Link>
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
