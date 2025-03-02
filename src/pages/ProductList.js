import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductList = () => {
  const products = [
    { id: 1, name: "Sản phẩm A", price: "200.000đ", image: "/images/product1.jpg" },
    { id: 2, name: "Sản phẩm B", price: "300.000đ", image: "/images/product2.jpg" },
    { id: 3, name: "Sản phẩm C", price: "400.000đ", image: "/images/product3.jpg" },
  ];

  return (
    <Container className="mt-4">
      <h2 className="text-center">Danh Sách Sản Phẩm</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <Card className="mb-3">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Button as={Link} to={`/product/${product.id}`} variant="primary">
                  Xem chi tiết
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
