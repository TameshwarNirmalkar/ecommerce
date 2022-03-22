import React, { useEffect } from "react";
import { Form, Input, Button, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../store/slices/userSlice";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => ({
    ...state.user,
  }));

  useEffect(() => {
    if (status === "SUCCESS") {
      navigate(-1);
    }
  }, [status, navigate]);

  const onFinish = async (values) => {
    let res = await dispatch(fetchUser(values));
    if (res.payload) {
      navigate("/products");
    }
  };

  return (
    <>
      <Divider orientation="left">Login</Divider>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ email: "tamesh@gmail.com", password: "Test123" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {error && (
          <Form.Item label="" validateStatus="error" help={error}></Form.Item>
        )}
      </Form>
    </>
  );
};

export default Login;
