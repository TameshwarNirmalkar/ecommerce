import React from "react";
import { Card, Input, Button, Space } from "antd";
import {
  DeleteFilled,
  DownloadOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
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
                key="add_to_cart"
              />,
            ]
          : [
              <Space key="add_quantity">
                <Input
                  addonBefore={
                    <Button
                      size={"small"}
                      onClick={() =>
                        updateQuantity({
                          ...selectedProd,
                          quantity: selectedProd.quantity + 1,
                        })
                      }
                      type="text"
                      icon={<PlusCircleFilled />}
                      style={{ color: "#7e7e7ed9" }}
                    />
                  }
                  addonAfter={
                    <Button
                      size={"small"}
                      disabled={selectedProd?.quantity === 1}
                      onClick={() =>
                        updateQuantity({
                          ...selectedProd,
                          quantity: selectedProd.quantity - 1,
                        })
                      }
                      type="text"
                      icon={<MinusCircleFilled />}
                      style={{ color: "#7e7e7ed9" }}
                    />
                  }
                  defaultValue={selectedProd?.quantity}
                  value={selectedProd?.quantity}
                />
                <DeleteFilled onClick={() => removeFromCart(id)} />
              </Space>,
            ]
      }
    >
      <Meta title={`${title}`} description={`Price: ${price}`} />
    </Card>
  );
};

export default ECard;
