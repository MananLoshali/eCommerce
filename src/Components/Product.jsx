import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWishlistProduct } from "../redux/userReducer";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  width: 280px;
  z-index: 2;
`;

const Icon = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item, wishlist }) => {
  const dispatch = useDispatch();

  const handleClick = (items) => {
    dispatch(addWishlistProduct({ ...items }));
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlinedIcon />
        </Icon>
        <Icon>
          <Link to={`/singleproduct/${item._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon
          disabled={wishlist ? true : false}
          onClick={() => {
            handleClick(item);
          }}
        >
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
