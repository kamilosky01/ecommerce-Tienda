
import React from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import GoogleLogin from "react-google-login";


const HeaderButtons = ({ isLoggedIn, setLogin }) => {

  var id= Math.floor(Math.random()*100);

  const respuestaGoogle = (respuesta) => {
    setLogin(true);
    localStorage.setItem("isLogged", true);
    //console.log(respuesta);
    comprobar(respuesta,id);

  };


  const [usuarios,setUsuarios] = React.useState([])

  React.useEffect(() => {

    componentDidMount();


  }, [])

  const componentDidMount = () => {
    const apiUrl = 'http://localhost:3000/api/user';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          setUsuarios(data);


      });
  };


 const comprobar = (respuesta,id)=> {

  var band = false;

   usuarios.map(function(elemento) {
     if(respuesta.nt.Yt === elemento.Correo){

       band = true;
       return true;



     }

   })
   


   if(band === false){
    add(respuesta,id);


   }


  }




  const logout = () => {
    setLogin(false);
    localStorage.setItem("isLogged", false);
  };


const add = (respuesta,id) => {
    
    fetch('http://localhost:3004/api/user', {
      method: 'POST', 
      body: JSON.stringify({
  
          Id: id,
          Usuario: respuesta.nt.Se,
          Correo: respuesta.nt.Yt,
          Estado: "No autorizado",
          Rol: "Vendedor",
  
  
      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    this.setTimeout("document.location = document.location", 2000);

   }



  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Nav className="me-auto">
          <Nav.Link href="/Presentacion">Presentacion</Nav.Link>
          <Nav.Link href="/GestionarProducto">Gestionar Productos</Nav.Link>
          <Nav.Link href="/GestionarVenta">Gestionar Ventas</Nav.Link>
          <Nav.Link href="/GestionarUsuario">Gestionar Usuarios</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Button variant="primary" onClick={logout} href="/" >
            Cerrar Sesion
          </Button>
        </Nav>

      </React.Fragment>
    );
  } else {
    return (
      
      <div className="App">
        <GoogleLogin
          clientId="135325355635-gg79ugh2ugpdaq7qjp22dbctkn2nriq6.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button variant="light" onClick={renderProps.onClick}>
              Ingresar
            </Button>
           
          )}
          buttonText="Login"
          onSuccess={respuestaGoogle}
          onFailure={respuestaGoogle}
          cookiePolicy={"single_host_origin"}
        />
        
      </div>
    );
  }
};

export default HeaderButtons;