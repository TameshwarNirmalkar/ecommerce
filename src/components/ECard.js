import React from "react";
import { Card, Input, Button, Space } from "antd";
import { DeleteFilled, ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;
const ECard = ({
  id,
  title,
  image,
  price,
  selectedProducts,
  addToCart,
  removeFromCart,
  updateQuantity,
}) => {
  const selectedProd = selectedProducts[id];

  return (
    <Card
      style={{ width: 200, padding: "0px 10px" }}
      cover={
        <img alt={`${title}`} src={`${image}`} style={{ height: "40%" }} />
      }
      actions={
        !selectedProd
          ? [
              <ShoppingCartOutlined
                onClick={() =>
                  addToCart({ id, title, image, price, quantity: 1 })
                }
                key="add to cart"
              />,
            ]
          : [
              <Space>
                <Input
                  addonBefore={
                    <Button
                      onClick={() =>
                        updateQuantity({
                          ...selectedProd,
                          quantity: selectedProd.quantity + 1,
                        })
                      }
                      type="link"
                    >
                      +
                    </Button>
                  }
                  addonAfter={
                    <Button
                      disabled={selectedProd?.quantity === 1}
                      onClick={() =>
                        updateQuantity({
                          ...selectedProd,
                          quantity: selectedProd.quantity - 1,
                        })
                      }
                      type="link"
                    >
                      -
                    </Button>
                  }
                  defaultValue={selectedProd?.quantity}
                  value={selectedProd?.quantity}
                />
                <DeleteFilled onClick={() => removeFromCart(id)} />
              </Space>,
            ]
      }
    >
      <Meta title={`${title}`} description={`Price:${price}`} />
    </Card>
  );
};

export default ECard;
