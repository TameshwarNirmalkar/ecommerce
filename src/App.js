import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Layout, Menu, Tag } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

import Login from "./container/Login";
import Products from "./container/Products";
import Cart from "./container/Cart";
import Checkout from "./container/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "./store/slices/productSlice";
import { logout } from "./store/slices/userSlice";

const { Header, Content, Footer } = Layout;

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state.user }));
  const { selectedProducts } = useSelector((state) => ({ ...state.products }));

  const logoutHandler = () => {
    dispatch(updateProducts({}));
    dispatch(logout(null));
  };

  return (
    <Router>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="user">
              <UserOutlined />
              {user ? `  ${user.firstName} ${user.lastName}` : ` Guest`}
            </Menu.Item>
            <Link to="/cart">
              <Menu.Item
                style={{ position: "absolute", right: "9%" }}
                key="cart"
              >
                <ShoppingCartOutlined key="cart" />
                {Object.keys(selectedProducts).length !== 0 && (
                  <Tag color="blue">
                    <span style={{ color: "red" }}>
                      {Object.keys(selectedProducts).length}
                    </span>
                  </Tag>
                )}
              </Menu.Item>
            </Link>
            {!user && (
              <Link to="/login">
                <Menu.Item
                  style={{ position: "absolute", right: "0px" }}
                  key="login"
                >
                  Login
                </Menu.Item>
              </Link>
            )}
            {user && (
              <Menu.Item
                style={{ position: "absolute", right: "0px" }}
                onClick={logoutHandler}
                key="logout"
              >
                Logout
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate replace={true} to="/products" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Router>
  );
}

export default App;
