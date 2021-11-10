import React from 'react';
import './GestionarVenta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

//import axios from 'axios';


class GestionarVenta extends React.Component{

   constructor(){
    super();
    this.state={
    datas:[],
    form: {IdVenta:'',ValorTotalVenta: '', IdProducto:'',  Cantidad:'', PrecioUnitarioCadaProducto:'', FechaVenta:'', DocumentoIdentificacion:'', NombreCliente:'', Vendedor:'', EstadoVenta:''},
    modalInsertar: false,
    modalEditar: false,
    _id:"",
    products:[],
    datas22:[],
    busqueda:"",



     };

   }

   filtrarElementos=()=>{
    var search = this.state.datas22.filter(item=>{
      if(item.IdVenta.toString().includes(this.state.busqueda) ){
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
  


   componentDidMount1() {
    const apiUrl = 'http://localhost:3004/api/products';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          this.setState({products:data})


      });
  };



componentDidMount() {
    const apiUrl = 'http://localhost:3004/api/ventas';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
          this.setState({datas:data})
          this.componentDidMount1()
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


  handleChange =(e)=>{

    this.setState({
    form: {
 
        ...this.state.form,
        [e.target.name]: e.target.value,
 
     }
 
   });
 
 }


add(){
    
    fetch('http://localhost:3004/api/ventas', {
      method: 'POST', 
      body: JSON.stringify({
  
          IdVenta: document.getElementById("IdVenta").value,
          ValorTotalVenta: document.getElementById("ValorTotalVenta").value,
          IdProducto: document.getElementById("IdProducto").value,
          Cantidad: document.getElementById("Cantidad").value,
          PrecioUnitarioCadaProducto: document.getElementById("PrecioUnitarioCadaProducto").value, 
          FechaVenta: document.getElementById("FechaVenta").value,
          DocumentoIdentificacion: document.getElementById("DocumentoIdentificacion").value,
          NombreCliente: document.getElementById("NombreCliente").value,
          Vendedor: document.getElementById("Vendedor").value,
          EstadoVenta: document.getElementById("EstadoVenta").value,
  
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



   UpdateVentas(){
    
    fetch('http://localhost:3004/api/ventas/'+ document.getElementById("_id").value, {
      method: 'PUT', 
      body: JSON.stringify({
  

        IdVenta: document.getElementById("IdVenta").value,
        ValorTotalVenta: document.getElementById("ValorTotalVenta").value,
        IdProducto: document.getElementById("IdProducto").value,
        Cantidad: document.getElementById("Cantidad").value,
        PrecioUnitarioCadaProducto: document.getElementById("PrecioUnitarioCadaProducto").value, 
        FechaVenta: document.getElementById("FechaVenta").value,
        DocumentoIdentificacion: document.getElementById("DocumentoIdentificacion").value,
        NombreCliente: document.getElementById("NombreCliente").value,
        Vendedor: document.getElementById("Vendedor").value,
        EstadoVenta: document.getElementById("EstadoVenta").value,

  
  
      }), 
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  
   }
  


   DeleteVentas(id){
    
    fetch('http://localhost:3004/api/ventas/'+ id, {
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

/* FUNCIONES PARA MOSTRAR Y OCULTAR EL MODAL DE INSERTAR*/  
mostrarModalInsertar=()=>{
  this.setState({modalInsertar:true});
}

ocultarModalInsertar=()=>{
    this.setState({modalInsertar:false});
}

/* FUNCIONES PARA MOSTRAR Y OCULTAR EL MODAL DE EDITAR*/ 

mostrarModalEditar=(registro)=>{
    this.setState({modalEditar:true, form: registro});
}
  
ocultarModalEditar=()=>{
      this.setState({modalEditar:false});
}

/* FUNCION PARA EDITAR*/

editar=(dato)=>{
    var contador= 0;
    var lista=this.state.datas;
    lista.map((registro)=>{
        if(dato.IdVenta==registro.IdVenta){
            lista[contador]._id = dato._id;
            lista[contador].ValorTotalVenta=dato.ValorTotalVenta;
            lista[contador].IdProducto = document.getElementById("IdProducto").value;
            lista[contador].Cantidad=dato.Cantidad;
            lista[contador].PrecioUnitarioCadaProducto=dato.PrecioUnitarioCadaProducto;
            lista[contador].FechaVenta=dato.FechaVenta;
            lista[contador].DocumentoIdentificacion=dato.DocumentoIdentificacion;
            lista[contador].NombreCliente=dato.NombreCliente;
            lista[contador].Vendedor=dato.Vendedor;
            lista[contador].EstadoVenta=document.getElementById("EstadoVenta").value;
            
            
        
        }
        contador++;
    });
    this.setState({data: lista,modalEditar: false});
    Swal.fire({
        title: 'Venta editada correctamente!',
        icon: "success",
        timer: '1700',

    });
    this.UpdateVentas();


}


/* FUNCION PARA INSERTAR*/

insertar= ()=>{
    
    var valorNuevo= {...this.state.form};
    valorNuevo.IdVenta=this.state.datas.length+8401;
    valorNuevo.EstadoVenta = document.getElementById("EstadoVenta").value;
    valorNuevo.IdProducto = document.getElementById("IdProducto").value;

    var lista= this.state.datas;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, datas: lista });
    this.add();

    Swal.fire({
        title: 'Venta agregada correctamente!',
        icon: "success",
        timer: '1700',

    });

  }


/* FUNCION PARA ELIMINAR*/

eliminar=(dato)=>{
    var opcion=window.confirm(" Seguro que desea eliminar la venta " + dato.IdVenta + " ? ")
    if(opcion){
        var contador=0;
        var lista = this.state.datas;
        lista.map((registro)=>{
            if(registro.IdVenta==dato.IdVenta){
                lista.splice(contador, 1);
            }
            contador++;
        })
        this.setState({datas:lista});
    }
    this.DeleteVentas(dato._id);

}


    render(){


    return (

        <div className="div">
            <Container className="body"> 
            <h1 className="text-center">Gestion ventas</h1>
            
            <form>
                <p>
                <div> 
                <label>ID</label>
                </div>
                  <Form.Control type="text" placeholder="Busqueda de venta por ID de venta" onChange={this.onChange}  value={this.state.busqueda}/>
                </p>

            </form>
            <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Agregar Venta</Button>

            <Table>
                <thead><tr><th className="text-center">ID Venta</th> 
                <th className="text-center">Valor total de la venta</th>
                <th className="text-center">ID del producto</th>
                <th className="text-center">Cantidad</th>
                <th className="text-center">Precio unitario del producto</th>
                <th className="text-center">Fecha de la Venta</th>
                <th className="text-center">Documento de identificacion</th>
                <th className="text-center">Nombre del cliente</th>
                <th className="text-center">Vendedor</th>
                <th className="text-center">Estado venta</th>
                <th className="text-center">Acciones</th>
                </tr></thead>
                <tbody>
                    {this.state.datas.map((elemento)=>(
                        <tr key={elemento._id}>
                            <td className="text-center">{elemento.IdVenta}</td>
                            <td className="text-center">{elemento.ValorTotalVenta}</td>
                            <td className="text-center">{elemento.IdProducto}</td>
                            <td className="text-center">{elemento.Cantidad}</td>
                            <td className="text-center">{elemento.PrecioUnitarioCadaProducto}</td>
                            <td className="text-center">{elemento.FechaVenta}</td>
                            <td className="text-center">{elemento.DocumentoIdentificacion}</td>
                            <td className="text-center">{elemento.NombreCliente}</td>
                            <td className="text-center">{elemento.Vendedor}</td>
                            <td className="text-center">{elemento.EstadoVenta}</td>

                            <td className="text-center" ><Button className="text-center" color="primary" onClick={()=>this.mostrarModalEditar(elemento)}><FaPencilAlt /></Button> {" "}
                            {" "}
                            <Button color="danger" onClick={()=>this.eliminar(elemento)}><FaTimes/></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Container>
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Registrar ventas</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    
                    <FormGroup>
                        <div>
                        <label>Id Venta:</label>
                        </div>
                        <input className="Form-control" readOnly name="IdVenta" id="IdVenta" type="text"  value = {this.state.datas.length+8401}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Valor total venta:</label>
                        </div>
                        <input className="Form-control" name="ValorTotalVenta" id="ValorTotalVenta" type="text" onChange={this.handleChange} />
                     </FormGroup>

                       
                    <FormGroup>
                        <div>
                        <label>Id producto</label>
                        </div>

                        <select id="IdProducto" className="btn btn-info dropdown-toggle" name="IdProducto" >
                            {this.state.products.map((elementos)=>(

                            <option key={elementos.IdProducto} className="btn btn-danger dropdown-toggle" value={elementos.IdProducto} >{elementos.IdProducto}</option>
                            ))}
                        </select>

                    </FormGroup>


                    <FormGroup>
                        <div>
                        <label>Cantidad:</label>
                        </div>
                        <input className="Form-control" name="Cantidad" type="text" id="Cantidad" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Precio unitario del producto:</label>
                        </div>
                        <input className="Form-control" name="PrecioUnitarioCadaProducto" id ="PrecioUnitarioCadaProducto" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Fecha de la venta:</label>
                        </div>
                        <input className="Form-control" name="FechaVenta" type="text" id="FechaVenta" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Documento de identificacion:</label>
                        </div>
                        <input className="Form-control" name="DocumentoIdentificacion" id ="DocumentoIdentificacion" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Nombre del cliente:</label>
                        </div>
                        <input className="Form-control" name="NombreCliente" id="NombreCliente" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Vendedor:</label>
                        </div>
                        <input className="Form-control" name="Vendedor" id="Vendedor" type="text" onChange={this.handleChange} />
                    </FormGroup>

                    
                    <FormGroup>
                        <div>
                        <label>Estado venta:</label>
                        </div>
                        <select id="EstadoVenta" className="btn btn-info dropdown-toggle" >
                            <option className="btn btn-danger dropdown-toggle" value="Proceso">Proceso</option>
                            <option className="btn btn-success dropdown-toggle" value="Cancelada">Cancelada</option>
                            <option className="btn btn-file dropdown-toggle" value="Entregada">Entregada</option>
                        </select>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.insertar()}>Agregar Venta</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        
    


            <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar ventas</h3>
                    </div>
                </ModalHeader>
                <ModalBody>

                <FormGroup>
                        <div>
                        <label>Id Object</label>
                        </div>
                        <input className="Form-control" readOnly name="Id" id="_id" type="text" value={this.state.form._id}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Id Venta:</label>
                        </div>
                        <input className="Form-control" readOnly name="IdVenta" id="IdVenta" type="text" value={this.state.form.IdVenta}/>
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Valor total venta:</label>
                        </div>
                        <input className="Form-control" name="ValorTotalVenta" id="ValorTotalVenta" type="text" onChange={this.handleChange} value={this.state.form.ValorTotalVenta}/>
                     </FormGroup>

                          
                    <FormGroup>
                        <div>
                        <label>Id producto</label>
                        </div>

                        <select id="IdProducto" className="btn btn-info dropdown-toggle" name="IdProducto" >
                            {this.state.products.map((elementos)=>(

                            <option key={elementos.IdProducto} className="btn btn-danger dropdown-toggle" value={elementos.IdProducto} >{elementos.IdProducto}</option>
                            ))}
                        </select>

                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Cantidad:</label>
                        </div>
                        <input className="Form-control" name="Cantidad" id="Cantidad" type="text" onChange={this.handleChange} value={this.state.form.Cantidad} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Precio unitario del producto:</label>
                        </div>
                        <input className="Form-control" name="PrecioUnitarioCadaProducto" id="PrecioUnitarioCadaProducto" type="text" onChange={this.handleChange} value={this.state.form.PrecioUnitarioCadaProducto} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Fecha de la venta:</label>
                        </div>
                        <input className="Form-control" name="FechaVenta" id="FechaVenta" type="text" onChange={this.handleChange} value={this.state.form.FechaVenta} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Documento de identificacion:</label>
                        </div>
                        <input className="Form-control" name="DocumentoIdentificacion" id="DocumentoIdentificacion" type="text" onChange={this.handleChange} value={this.state.form.DocumentoIdentificacion} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Nombre del cliente:</label>
                        </div>
                        <input className="Form-control" name="NombreCliente" id="NombreCliente" type="text" onChange={this.handleChange} value={this.state.form.NombreCliente} />
                    </FormGroup>

                    <FormGroup>
                        <div>
                        <label>Vendedor:</label>
                        </div>
                        <input className="Form-control" name="Vendedor" id ="Vendedor" type="text" onChange={this.handleChange} value={this.state.form.Vendedor} />
                    </FormGroup>

                    
                    <FormGroup>
                        <div>
                        <label>Estado venta:</label>
                        </div>
                        <select id="EstadoVenta" className="btn btn-info dropdown-toggle">
                            <option className="btn btn-danger dropdown-toggle" value="Proceso">Proceso</option>
                            <option className="btn btn-success dropdown-toggle" value="Cancelada">Cancelada</option>
                            <option className="btn btn-file dropdown-toggle" value="Entregada">Entregada</option>
                        </select>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={()=>this.editar(this.state.form)}>Editar</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>


       )
    }
}      
    

export default GestionarVenta;
