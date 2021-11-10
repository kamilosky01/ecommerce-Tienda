import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import './Login.css';


const Login = () => {
  return (
    <div>
      <Container className="Logo">
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={4}>
            <Grid
              container
              justifyContent="center"
              direction="column"
              alignItems="center"
              style={{ minHeight: "20vh" }}
            >
              <Image src={require("../components/Logo.png").default} />
            </Grid>
            <Form>
              <h3 className="text-center">Ingresar</h3>
              <div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="Ingrese su Correo" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recordar" />
              </Form.Group>
              <Container>
                <Row className="d-flex justify-content-center align-items-center">
                  <Col xs={4}>
                    <Nav className="nav nav-pills">
                      <Nav className="nav-item">
                        <NavLink
                          to="/home"                          
                          style={{ backgroundColor: "Primary" }}
                          className="nav-link active"
                          aria-current="page"
                        >
                          Ingresar
                        </NavLink>
                      </Nav>
                    </Nav>
                  </Col>
                </Row>
              </Container>
              <p className="mt-5 mb-3 text-muted text-center">
              Somos una empresa encargada de suministrar, elaborar, diseñar, todo tipo de regalos personalizados o artesanales y que son de uso cotidiano. Mugs, camisetas, libretas, lapiceros, almohadas, gorras, termos, llaveros, bolsas para empacar y cargar, rompecabezas, estuches, globos, etc.
              </p>
              <p className="mt-5 mb-3 text-muted text-center">
                &copy; 2021 Tienda de Regalos MinTic_Udea
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
