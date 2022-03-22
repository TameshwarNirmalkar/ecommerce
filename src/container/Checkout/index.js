import React, { useEffect } from "react";
import { Col, Row, Breadcrumb, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateProducts } from "../../store/slices/productSlice";
import { logout } from "../../store/slices/userSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({
    ...state.user,
  }));

  const { selectedProducts } = useSelector((state) => ({
    ...state.products,
  }));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const getProductQuantity = () => {
    let quantity = 0;
    Object.keys(selectedProducts).forEach((key) => {
      quantity = quantity + selectedProducts[key].quantity;
    });
    return quantity;
  };

  const getDiscountedPrice = () => {
    let totalPrice = 0;
    Object.keys(selectedProducts).forEach((key) => {
      totalPrice =
        totalPrice +
        selectedProducts[key].price * selectedProducts[key].quantity;
    });
    if (totalPrice !== 0) {
      totalPrice = totalPrice - totalPrice * 0.15;
    }

    return totalPrice.toFixed(2);
  };

  const getDiliverDate = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateObj = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const output = month + "\n" + day + "," + year;
    return output;
  };

  const confirmOrderHandler = () => {
    dispatch(updateProducts([]));
    dispatch(logout(null));
    navigate("/products");
  };

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col span={24}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Link to="/">
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Link>
            <Link to="/cart">
              <Breadcrumb.Item>Cart</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Checkout</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {Object.keys(selectedProducts).length !== 0 && (
        <Row>
          <Col span={8}>
            <Card
              actions={[
                <Button
                  onClick={confirmOrderHandler}
                  disabled={!user}
                  type="link"
                  block
                >
                  {user && " Confirm Order"}
                </Button>,
              ]}
              title="Cart summary"
              style={{ width: 300 }}
            >
              <p>
                Total products: {` ${Object.keys(selectedProducts).length}`}
              </p>
              <p>Total quantity: {getProductQuantity()}</p>
              <p>15% Discounted price: {getDiscountedPrice()}</p>
              <p>Deliver Date: {getDiliverDate()}</p>
              <p>Mobile: {user?.mobile}</p>
              <p>Address: {user?.address}</p>
              <p>Pincode: {user?.pincode}</p>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Checkout;
