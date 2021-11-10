import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Producto = ({ producto }) => {
  return (
    <Card bg="info" style={{ width: "18rem", margin: "30px", height: "485px"}}>
      <Card.Img variant="top" src={producto.url} />
      <Card.Body >
        <Card.Title>{producto.title}</Card.Title>
        <Card.Text >{producto.description}</Card.Text>
        <Button variant="primary">${producto.price}</Button>
      </Card.Body>
    </Card>
  );
};

export default Producto;