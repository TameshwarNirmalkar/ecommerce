import React from "react";
import { Col, Row, Breadcrumb, Empty, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProducts } from "../../store/slices/productSlice";
import ECard from "../../components/ECard";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({
    ...state.user,
  }));

  const { selectedProducts } = useSelector((state) => ({
    ...state.products,
  }));

  const removeFromCart = (id) => {
    const updateProd = { ...selectedProducts };
    delete updateProd[id];
    dispatch(updateProducts(updateProd));
  };

  const updateQuantity = (prod) => {
    const updateProd = { ...selectedProducts };
    updateProd[prod.id] = prod;
    dispatch(updateProducts(updateProd));
  };

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
      totalPrice = totalPrice + selectedProducts[key].price * selectedProducts[key].quantity;
    });
    if (totalPrice !== 0) {
      totalPrice = totalPrice - totalPrice * 0.15;
    }

    return totalPrice.toFixed(2);
  };

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col span={24}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Link to="/">
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Cart</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        {Object.keys(selectedProducts).length === 0 && (
          <Col span={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Cart is empty!" />
          </Col>
        )}
      </Row>
      {Object.keys(selectedProducts).length !== 0 && (
        <Row>
          <Col span={16}>
            {Object.keys(selectedProducts).map((key) => (
              <Col key={key} span={8}>
                <ECard {...selectedProducts[key]} removeFromCart={removeFromCart} addToCart={null} selectedProducts={selectedProducts} updateQuantity={updateQuantity} />
              </Col>
            ))}
          </Col>
          <Col span={8}>
            <Card
              actions={[
                <Button onClick={() => navigate("/checkout")} disabled={!user} type="link" block>
                  {user ? "Checkout" : "Login to Checkout"}
                </Button>,
              ]}
              title="Cart summary"
              style={{ width: 300 }}
            >
              <p>Total products: {` ${Object.keys(selectedProducts).length}`}</p>
              <p>Total quantity: {getProductQuantity()}</p>
              <p>15% Discounted price: {getDiscountedPrice()}</p>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Cart;
