import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GestionarProducto.css';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

//import axios from 'axios';


class GestionarProducto extends React.Component{


    constructor(){
        super();

    this.state={
        datas:[],
        form: {IdProducto:'', Descripcion: '', ValorUnitario:'', Estado:''},
        modalInsertar: false,
        modalEditar: false,
        _id:"",
        busqueda:"",
        datas22:[],

 

    
    };
    
}

filtrarElementos=()=>{
  var search = this.state.datas22.filter(item=>{
    if(item.IdProducto.toString().includes(this.state.busqueda) ){
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
    const apiUrl = 'http://localhost:3000/api/products';
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
    
  fetch('http://localhost:3004/api/products', {
    method: 'POST', 
    body: JSON.stringify({

        IdProducto: document.getElementById("IdProducto").value,
        Descripcion: document.getElementById("Descripcion").value,
        ValorUnitario: document.getElementById("ValorUnitario").value,
        Estado: document.getElementById("estado").value,


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



 UpdateProducts(){
    
    fetch('http://localhost:3004/api/products/'+ document.getElementById("_id").value, {
      method: 'PUT', 
      body: JSON.stringify({
  
          IdProducto: document.getElementById("IdProducto").value,
          Descripcion: document.getElementById("Descripcion").value,
          ValorUnitario: document.getElementById("ValorUnitario").value,
          Estado: document.getElementById("estado").value,
  
  
      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  
   }


   DeleteProducts(id){
    
    fetch('http://localhost:3004/api/products/'+ id, {
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
      valorNuevo.IdProducto=this.state.datas.length+1;
      valorNuevo.Estado = document.getElementById("estado").value;
      var lista= this.state.datas;
      lista.push(valorNuevo);
      this.setState({ modalInsertar: false, datas: lista });
      this.add();
  
      Swal.fire({
        title: 'Producto agregado correctamente!',
        icon: "success",
        timer: '1700',
  
      });
  
        
    }

 
    editar = (dato) => {

      var contador = 0;
      var arreglo = this.state.datas;
      arreglo.map((registro) => {
        if (dato.IdProducto == registro.IdProducto) {
          arreglo[contador]._id = dato._id;
          arreglo[contador].Descripcion = dato.Descripcion;
          arreglo[contador].ValorUnitario = dato.ValorUnitario;
          arreglo[contador].Estado = document.getElementById("estado").value;
  
  
  
        }
        contador++;
      });
      this.setState({ datas: arreglo, modalEditar: false });
      Swal.fire({
        title: 'Producto editado correctamente!',
        icon: "success",
        timer: '1700',
  
      });
      this.UpdateProducts();
    };

eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.IdProducto);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.datas;
      arreglo.map((registro) => {
        if (dato.IdProducto == registro.IdProducto) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ datas: arreglo, modalEditar: false });
    }
    this.DeleteProducts(dato._id);
    
  };


   render(){
    return (

        <div className="div">
            <Container className="body">
            <h1 className="text-center">Gestion productos</h1>
            <form>
                <p>
                <div>
                <label>ID</label>
                </div>
                  <Form.Control type="text" placeholder="Busqueda de producto por ID de producto" onChange={this.onChange}  value={this.state.busqueda}/>
                </p>
            </form>
            <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Agregar Producto</Button>
           

            <Table>
                <thead><tr><th className="text-center">ID Producto</th>
                <th className="text-center">Descripcion</th>
                <th className="text-center">Valor unitario</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Acciones</th>
                </tr></thead>
                <tbody>
                    {this.state.datas.map((elemento)=>(
                        <tr key={elemento._id}>
                            <td className="text-center">{elemento.IdProducto}</td>
                            <td className="text-center">{elemento.Descripcion}</td>
                            <td className="text-center">{elemento.ValorUnitario}</td>
                            <td className="text-center">{elemento.Estado}</td>
                            <td className="text-center" ><Button className="text-center" onClick = {()=>this.mostrarModalEditar(elemento)} color="primary"><FaPencilAlt /> </Button> {" "}
                            <Button onClick={() =>this.eliminar(elemento)} color="danger"><FaTimes /> </Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Registrar Producto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div>
                        <label>Id Producto:</label>
                        </div>
                        <input className="Form-control" id="IdProducto" readOnly name="IdProducto" type="text"  value = {this.state.datas.length+1}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Descripcion:</label>
                        </div>
                        <textarea rows="4" cols="32" name="Descripcion"  id="Descripcion" Type ="text" onChange={this.handleChange} />
                     </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Valor unitario:</label>
                        </div>
                        <input className="Form-control" name="ValorUnitario" id="ValorUnitario" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <p>
                        <div>
                        <label>Estado:</label>
                        </div>
                        <select id="estado" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-danger dropdown-toggle" value="No disponible">No disponible</option>
                            <option className="btn btn-success dropdown-toggle" value="Disponible">Disponible</option>
                        </select>
                        </p>

                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.insertar()}  >Agregar Producto</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                </ModalFooter>

            </Modal>




            <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Registrar Producto</h3>
                    </div>
                </ModalHeader>
                <ModalBody>

                <FormGroup>
                        <div>
                        <label>Id Object:</label>
                        </div>
                        <input className="Form-control" readOnly name="_id" type="text"  id="_id" onChange={this.handleChange} value = {this.state.form._id}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Id Producto:</label>
                        </div>
                        <input className="Form-control" readOnly name="IdProducto" type="text"  id="IdProducto" value = {this.state.form.IdProducto}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Descripcion:</label>
                        </div>
                        <textarea rows="4" cols="32" name="Descripcion" Type ="text" id="Descripcion" onChange={this.handleChange} value = {this.state.form.Descripcion}/>
                     </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Valor unitario:</label>
                        </div>
                        <input className="Form-control" name="ValorUnitario" id ="ValorUnitario" type="text" onChange={this.handleChange} value = {this.state.form.ValorUnitario}/>
                    </FormGroup>

                    <FormGroup>
                        <p>
                        <div>
                        <label>Estado:</label>
                        </div>
                        <select id="estado" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-danger dropdown-toggle" value="No disponible">No disponible</option>
                            <option className="btn btn-success dropdown-toggle" value="Disponible">Disponible</option>
                        </select>
                        </p>

                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.editar(this.state.form)}>Editar Producto</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
                </ModalFooter>

            </Modal>
        </div>

       )
    }
    
  }
export default GestionarProducto;