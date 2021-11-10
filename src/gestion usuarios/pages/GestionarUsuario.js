import React from 'react';
import './GestionarUsuario.css';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import Swal from 'sweetalert2';



class GestionarUsuario extends React.Component{


constructor(){
  super();
  this.state={
    datas:[],
    form: {Id:'', Usuario: '', Correo:'', Estado:'', Rol:''},
    modalInsertar: false,
    modalEditar: false,
    _id:"",
    datas22:[],
    busqueda:"",

  };

}

filtrarElementos=()=>{
  var search = this.state.datas22.filter(item=>{
    if(item.Id.toString().includes(this.state.busqueda) ){
      return item;
    }
  });

  this.setState({datas: search});
  


}


onChange = async e => {
  await this.setState({busqueda: e.target.value});
  console.log(this.state.busqueda);
  this.filtrarElementos();

}


componentDidMount() {
    const apiUrl = 'http://localhost:3000/api/user';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          this.setState({datas:data})
          this.setState({datas22:data})



      });
  };


handleChange =(e)=>{

  this.setState({
  form: {

      ...this.state.form,
      [e.target.name]: e.target.value,

   }

 });

}



add(){
    
    fetch('http://localhost:3004/api/user', {
      method: 'POST', 
      body: JSON.stringify({
  
          Id: document.getElementById("Id").value,
          Usuario: document.getElementById("Usuario").value,
          Correo: document.getElementById("Correo").value,
          Estado: document.getElementById("Estado").value,
          Rol: document.getElementById("Rol").value,

  
  
      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    setTimeout("document.location = document.location", 2000);

  
   }


   UpdateUsuario(){
    
    fetch('http://localhost:3004/api/user/'+ document.getElementById("_id").value, {
      method: 'PUT', 
      body: JSON.stringify({
  
          
        Id: document.getElementById("Id").value,
        Usuario: document.getElementById("Usuario").value,
        Correo: document.getElementById("Correo").value,
        Estado: document.getElementById("Estado").value,
        Rol: document.getElementById("Rol").value,
  
  
      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  
   }



   DeleteUsuario(id){
    
    fetch('http://localhost:3004/api/user/'+ id, {
      method: 'DELETE', 
      body: JSON.stringify({
  
     
  
  
      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  
   }


  

mostrarModalInsertar=()=>{
 this.setState({modalInsertar:true});
}

ocultarModalInsertar=()=>{
   this.setState({modalInsertar:false});
 }

mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro});
   }
   
ocultarModalEditar=()=>{
      this.setState({modalEditar:false});
    }


    insertar= ()=>{
   
      var valorNuevo= {...this.state.form};
      valorNuevo.Id=this.state.datas.length+5050;
      valorNuevo.Estado = document.getElementById("Estado").value;
      valorNuevo.Rol = document.getElementById("Rol").value
      var lista= this.state.datas;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, datas: lista });
      this.add();
   
      Swal.fire({
       title: 'Usuario agregado correctamente!',
       icon: "success",
       timer: '1700',
   
     });
   
   
    }
   
   
    editar = (dato) => {
       var contador = 0;
       var arreglo = this.state.datas;
       arreglo.map((registro) => {
         if (dato.Id == registro.Id) {
           arreglo[contador]._id = dato._id;
           arreglo[contador].Usuario = dato.Usuario;
           arreglo[contador].Correo = dato.Correo;
           arreglo[contador].Estado = document.getElementById("Estado").value;
           arreglo[contador].Rol = document.getElementById("Rol").value;
   
   
   
         }
         contador++;
       });
       this.setState({ datas: arreglo, modalEditar: false });
       Swal.fire({
         title: 'Estado o rol de usuario editado correctamente!',
         icon: "success",
         timer: '1700',
   
       });
       this.UpdateUsuario();

     };
   

eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.Id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.datas;
      arreglo.map((registro) => {
        if (dato.Id == registro.Id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ datas: arreglo, modalEditar: false });
    }
    this.DeleteUsuario(dato._id);

  };

   render(){
    return (
            
      <div className="div">
            <Container className="body">
            <h1 className="text-center">Gestion Usuario</h1>
            <form>
                <p>
                <div>
                <label>ID</label>
                </div>
                  <Form.Control type="text" placeholder="Busqueda de usuario por ID de usuario" onChange={this.onChange}  value={this.state.busqueda}/>
                </p>
            </form>
            <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Agregar Usuario</Button>
           

            <Table>
                <thead><tr><th className="text-center">ID Usuario</th>
                <th className="text-center">Usuario</th>
                <th className="text-center">Correo</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Rol</th>
                <th className="text-center">Acciones</th>
                </tr></thead>
                <tbody>
                    {this.state.datas.map((elemento)=>(
                        <tr key={elemento._id}>
                            <td className="text-center">{elemento.Id}</td>
                            <td className="text-center">{elemento.Usuario}</td>
                            <td className="text-center">{elemento.Correo}</td>
                            <td className="text-center">{elemento.Estado}</td>
                            <td className="text-center">{elemento.Rol}</td>
                            <td className="text-center" ><Button onClick = {()=>this.mostrarModalEditar(elemento)}  className="text-center" color="primary"><FaPencilAlt /> </Button> {" "}
                            <Button onClick={() =>this.eliminar(elemento)} color="danger"><FaTimes /> </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Registrar Usuario</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div>
                        <label>Id usuario:</label>
                        </div>
                        <input className="Form-control" readOnly name="Id" id="Id" type="text"  value = {this.state.datas.length+5050}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Usuario:</label>
                        </div>
                        <input className="Form-control" name="Usuario" id="Usuario" type="text" onChange={this.handleChange} />

                     </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Correo:</label>
                        </div>
                        <input className="Form-control" name="Correo" id ="Correo" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <p>
                        <div>
                        <label>Estado:</label>
                        </div>
                        <select id="Estado" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-danger dropdown-toggle" value="Pendiente">Pendiente</option>
                            <option className="btn btn-success dropdown-toggle" value="Autorizado">Autorizado</option>
                            <option className="btn btn-success dropdown-toggle" value="No autorizado">No utorizado</option>

                        </select>
                        </p>

                    </FormGroup>



                    <FormGroup>
                        <p>
                        <div>
                        <label>Rol:</label>
                        </div>
                        <select id="Rol" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-danger dropdown-toggle" value="Administrador">Administrador</option>
                            <option className="btn btn-success dropdown-toggle" value="Vendedor">Vendedor</option>
                        </select>
                        </p>

                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.insertar()}>Agregar Usuario</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                </ModalFooter>

            </Modal>



            <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Usuario</h3>
                    </div>
                </ModalHeader>
                <ModalBody>

                  
                <FormGroup>
                        <div>
                        <label>Id Object:</label>
                        </div>
                        <input className="Form-control" readOnly name="Id" id="_id" type="text"  value = {this.state.form._id}/>
                    </FormGroup>


                    <FormGroup>
                        <div>
                        <label>Id usuario:</label>
                        </div>
                        <input className="Form-control" readOnly name="Id" id="Id" type="text"  value = {this.state.form.Id}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Usuario:</label>
                        </div>
                        <input className="Form-control" name="Usuario" id="Usuario" readOnly type="text" onChange={this.handleChange} value = {this.state.form.Usuario} />

                     </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Correo:</label>
                        </div>
                        <input className="Form-control" name="Correo" id="Correo" readOnly type="text" onChange={this.handleChange} value = {this.state.form.Correo} />
                    </FormGroup> 

                    <FormGroup>
                        <p>
                        <div>
                        <label>Estado:</label>
                        </div>
                        <select id="Estado" className="btn btn-info dropdown-toggle">
                            <option className="btn btn-danger dropdown-toggle" value="Pendiente">Pendiente</option>
                            <option className="btn btn-success dropdown-toggle" value="Autorizado">Autorizado</option>
                            <option className="btn btn-success dropdown-toggle" value="No autorizado">No autorizado</option>

                        </select>
                        </p>

                    </FormGroup>



                    <FormGroup>
                        <p>
                        <div>
                        <label>Rol:</label>
                        </div>
                        <select id="Rol" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-danger dropdown-toggle" value="Administrador">Administrador</option>
                            <option className="btn btn-success dropdown-toggle" value="Vendedor">Vendedor</option>
                        </select>
                        </p>

                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.editar(this.state.form)}>Editar Usuario</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
                </ModalFooter>

            </Modal>
        </div>

    )
  }
}

export default GestionarUsuario;
