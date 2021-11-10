import { Container, Row, Col } from "react-bootstrap";
import Producto from "./Producto";
import './Producto.css';


const ListaProductos = () => {
  const productos = [
    {
      title: "Mug Personalizado",
      description: "Mug mágico, Ideal para regalar o coleccionar!",
      price: 15000,
      url: "https://ladralo.com/wp-content/uploads/2019/08/MUG-PERSONALIZADO-TERRIER-2.png",
    },
    {
      title: "Camisetas Personalizables",
      description: "Personaliza Tu Diseño, Frase, Imagen Preferida Para Niños Y Adultos.",
      price: 24900,
      url: "https://i2.wp.com/store.dussandesigns.com/wp-content/uploads/2020/10/TU-DISENO-AQUI-1-scaled.jpg?fit=600%2C600&ssl=1",
    },
    {
      title: "Almohadas",
      description: "Cojines personalizados para toda ocasion",
      price: 34200,
      url: "https://i.linio.com/p/c947f3dc56ce99322fa56f03902aee64-product.jpg",
    },
    {
      title: "Libretas Personalizadas",
      description: "Pasta dura artesanal",
      price: 37000,
      url: "https://http2.mlstatic.com/D_NQ_NP_642242-MCO47225845274_082021-O.webp",
    }
  ];

  return (
    <Container className="body">
      <h1>Productos</h1>
      <Row >
        {productos.map((producto) => (
          <Col xs={5} key={producto._id}>
            <Producto producto={producto} key={producto._id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaProductos;