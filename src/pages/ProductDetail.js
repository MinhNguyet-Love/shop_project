import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const product = {
    id: id,
    name: "Sản phẩm A",
    price: "200.000đ",
    description: "Mô tả sản phẩm chi tiết...",
    image: "/images/product1.jpg",
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>Giá: {product.price}</h4>
          <Button variant="success">Thêm vào giỏ hàng</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
