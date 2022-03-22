import React, { useEffect } from "react";
import { Col, Row, Breadcrumb, Spin, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProducts } from "../../store/slices/productSlice";
import ECard from "../../components/ECard";

const Products = () => {
  const dispatch = useDispatch();

  const { products, status, selectedProducts } = useSelector((state) => ({
    ...state.products,
  }));

  useEffect(() => {
    if (status === "IDEAL") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const addToCart = (prod) => {
    const updateProd = { ...selectedProducts };
    updateProd[prod.id] = prod;
    dispatch(updateProducts(updateProd));
  };

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

  return (
    <Spin spinning={products.length === 0} tip="Loading...">
      <div className="site-card-wrapper">
        <Row>
          <Col span={24}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <h2>Products</h2>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Divider />
        <Row align="bottom" justify="start" gutter={[10, 10]}>
          {products.map((product) => (
            <Col key={product.id}>
              <ECard
                {...product}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                selectedProducts={selectedProducts}
                updateQuantity={updateQuantity}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Spin>
  );
};

export default Products;
