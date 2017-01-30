import { Component, OnInit } from '@angular/core';

import { ElementoListaDePrecios } from './elementoListaDePrecios';
import { ProductoSeleccionado } from './productoSeleccionado';
import { MateriaPrima } from '../app_materiasPrima/materiaPrima';
import { SemiProcesado } from '../app_semiProcesados/semiProcesado';
import { ProductoTerminado } from '../app_productosTerminados/productoTerminado';

import { ListaDePrecioServices } from './listaDePrecioServices';
import { MateriaPrimaServices } from '../app_materiasPrima/materiaPrimaServices';
import { SemiProcesadoServices } from '../app_semiProcesados/semiProcesadoServices';
import { ProductoTerminadoServices } from '../app_productosTerminados/productoTerminadoServices';

@Component({
  selector: 'lista-precios-component',
  templateUrl: "app/app_listaDePrecios/listaDePrecioComponent.html"
})

export class ListaDePrecioComponent {
  private nombreUsuario: string;
  private permisos: string;

  private productosSeleccionados: Array<ProductoSeleccionado>;
  private materiasPrimaDisponibles: Array<MateriaPrima>;
  private semiProcesadosDisponibles: Array<SemiProcesado>;
  private productosTerminadosDisponibles: Array<ProductoTerminado>;

  private listaDePrecios: ElementoListaDePrecios[];
  private mapListaDePrecios: Map<string, Array<ElementoListaDePrecios> >;
  private nombresListaDePrecios: Array<string>;

  private listaSolicitada: string;
  private productosListos: boolean;
  private mpListas: boolean;

  private mostrarModal: boolean = true;
  
  constructor(
  	private lpService: ListaDePrecioServices,
  	private mpService: MateriaPrimaServices,
  	private spService: SemiProcesadoServices,
  	private ptService: ProductoTerminadoServices){

    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    this.nombreUsuario = dataLogin.nombreUsuario;
    this.permisos = dataLogin.permisos;

    this.productosSeleccionados = new Array<ProductoSeleccionado>();
  }

  ngOnInit() {
    console.log("ON INIT");
    this.productosListos = false;
    this.mpListas = false;
    this.cargarListaDePrecios();
  }

  cargarListaDePrecios(){
    console.log("CARGANDO LDP");
    // en el momento del subscribe es cuando se dispara la llamada
    this.lpService.getListaDePrecios()
                  .subscribe(listaDePreciosData => 
                    {
                      this.listaDePrecios = listaDePreciosData;
                      this.mapListaDePrecios = new Map<string, any>();

                      for (let element of this.listaDePrecios){
                        if (!this.mapListaDePrecios.has(element.nombre)) {
                          let productos = new Array<ElementoListaDePrecios>();
                          productos.push(element);
                          this.mapListaDePrecios.set(element.nombre, productos);
                        } else {
                          let productos = this.mapListaDePrecios.get(element.nombre);
                          productos.push(element);
                          this.mapListaDePrecios.set(element.nombre, productos);
                        }
                      }

                      this.nombresListaDePrecios = new Array<string>();
                      this.mapListaDePrecios.forEach((value: any, key: string) => {
                        this.nombresListaDePrecios.push(key);
                      });

                      console.log("NOMBRES LISTAS= " + this.nombresListaDePrecios);
                    }, 
                    err => console.error("EL ERROR FUE: ", err)
                  );

    //this.materiasPrimaDisponibles = new Array<MateriaPrima>();

    this.mpService.getBasicDataMateriasPrima()
    			  .subscribe(
    			  	materiasPrimas => {
    			  		this.materiasPrimaDisponibles = materiasPrimas;
    			  	}
    			  		,
    			  	err => console.error("EL ERROR FUE: ", err)
    			  );

    this.spService.getBasicDataSemiProcesados()
    			  .subscribe(
    			  	sp => {
    			  		this.semiProcesadosDisponibles = sp;
    			  	}
    			  		,
    			  	err => console.error("EL ERROR FUE: ", err)
    			  );


    this.ptService.getBasicDataProductosTerminados()
    			  .subscribe(
    			  	pt => {
    			  		this.productosTerminadosDisponibles = pt;
    			  	}
    			  		,
    			  	err => console.error("EL ERROR FUE: ", err)
    			  );


  }

	onChange(id: string, nombre: string, precioVenta: number ,tipo: string,valorCheck:boolean){
	    if(valorCheck == true) {
	    	this.productosSeleccionados.push(new ProductoSeleccionado(id, nombre, precioVenta, tipo));
	    } else {
	    	for (let productoSeleccionado of this.productosSeleccionados){
	    		if(productoSeleccionado.id == id) {
	    			let index = this.productosSeleccionados.indexOf(productoSeleccionado);
	    			this.productosSeleccionados.splice(index, 1);
	    		}
	    	}
	    }
	    console.log(id+" : "+nombre+" : "+valorCheck);
	}

	onPrecioVentaChange(precioVenta: number, id: string){
		for (var i = 0; i < this.productosSeleccionados.length; ++i) {
			if(this.productosSeleccionados[i].id == id) {
				this.productosSeleccionados[i].precio = precioVenta;
			}
		}
	}

/*	productoMarcado(id: string): boolean{
		for (var i = 0; i < this.productosSeleccionados.length; ++i) {
			if(this.productosSeleccionados[i].id == id) {
				this.productosSeleccionados[i].precio = precioVenta;
			}
		}
	}*/



/*  private procesarLista(listaDePreciosData: ElementoListaDePrecios[]){
    this.listaDePrecios = listaDePreciosData;
    console.log(this.listaDePrecios);

    this.mapListaDePrecios = [];

    for (let element of this.listaDePrecios){
      if (this.mapListaDePrecios.indexOf(element.nombre) == -1) {
          this.mapListaDePrecios.push(element.nombre);
      }
    }

    console.log("NOMBRES LISTAS= " + this.mapListaDePrecios);
  }*/

  ver(nombreLista: string){
    console.log("MOSTRANDO= " + nombreLista);
    this.listaSolicitada = nombreLista;
    this.productosListos = true;
  }

  getProductos(): Array<ElementoListaDePrecios>{
    console.log("OBTENIENDO PRODUCTOS");
    let productos = new Array<any>();

    for (let producto of this.mapListaDePrecios.get(this.listaSolicitada)){
      if(producto.mp_ID) {
        productos.push({nombre: producto.mp_ID.nombre, precio: producto.precio})
      }

      if(producto.sp_ID) {
        productos.push({nombre: producto.sp_ID.nombre, precio: producto.precio})
      }

      if(producto.pt_ID) {
        productos.push({nombre: producto.pt_ID.nombre, precio: producto.precio})
      }
    }

    console.log(productos);

    return productos;
  }

  borrar(nombreLista: string){
    let r = confirm("¿Realmente desea realizar el borrado?");
    if (r == true) {
        console.log("You pressed OK!");
        console.log("nombreLista borrado= " + nombreLista);
        this.lpService.borrarListaDePrecio(nombreLista)
                      .subscribe(
                        () => { 
                      alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                      window.location.reload();
                      },
                        err => console.error("EL ERROR FUE: ", err)
                      );
    } else {
        console.log("You pressed CANCEL!");
    }
  }

  modificar(nombre: string){
    this.listaSolicitada = nombre;

/*    this._id =                cliente._id;
    this.nombreEmpresa =      cliente.nombreEmpresa;
    this.cuit =               cliente.cuit;
    this.categoriaFiscal =    cliente.categoriaFiscal;
    this.listaPrecioID =      cliente.listaPrecioID;
    this.direccion =          cliente.direccion;
    this.condicionPago =    cliente.condicionPago;*/
  }

  guardarModificaciones(){
/*    if(this.nombreEmpresa){
      this.mostrarModal = false;
      let cliente = {
          _id:                this._id,
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscal:    this.categoriaFiscal,
          listaPrecioID:      this.listaPrecioID,
          direccion:          this.direccion,
          condicionPago:    this.condicionPago
      }
      
      console.log(cliente);

      this.lpService.modificar(cliente)
                    .subscribe(data => {
                        console.log(data);
                        
                        alert("\t\t\t\t¡ListaDePrecio modificado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();                        
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al modificar ListaDePrecio!\n\nRevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
    }*/
  }

  crear(nombreLista: string){
  	if(nombreLista){
	  	for (let productoSeleccionado of this.productosSeleccionados){
	  		let productoBody = {
	  			nombre: nombreLista,
	  			mp_ID: (productoSeleccionado.tipo == "MP" ? productoSeleccionado.id : null),
	  			sp_ID: (productoSeleccionado.tipo == "SP" ? productoSeleccionado.id : null),
	  			pt_ID: (productoSeleccionado.tipo == "PT" ? productoSeleccionado.id : null),
	  			precio: productoSeleccionado.precio
	  		}

		    this.lpService.agregarListaDePrecio(productoBody)
		                    .subscribe(data => {
		                        console.log(data);
		                        
	                        
		                    }, error => {
		                        console.log(JSON.stringify(error.json()));
		                        alert("\t\t\t¡ERROR al crear Lista De Precio!\n\nRevise los campos");
		                    });

	  	}

	    alert("\t\t\t¡Lista de Precio creada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
	    window.location.reload();
	} else {
		alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
	}
  }



  guardar(nombreLista: string){
  	if(nombreLista){
	    this.lpService.modificarNombre({actualName: this.listaSolicitada, nombre: nombreLista})
	        .subscribe(data => {
	            console.log(data);
	            
	            alert("\t\t\t\t¡Lista de Precio modificado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
	            window.location.reload();                        
	        }, error => {
	            console.log(JSON.stringify(error.json()));
	            alert("\t\t\t\t¡ERROR al modificar Lista De Precio!\n\nRevise los campos");
	        });
  	} else {
  		alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
	}
  }


}




/*  agregar() {

    if(this.nombreEmpresa){

      let listaDePrecio = {
          nombreEmpresa:      this.nombreEmpresa,
          cuit:               this.cuit,
          categoriaFiscal:    this.categoriaFiscal,
          listaPrecioID:      this.listaPrecioID,
          direccion:          this.direccion,
          condicionPago:    this.condicionPago
      }
      
      console.log(listaDePrecio);

      this.lpService.agregarListaDePrecio(listaDePrecio)
                    .subscribe(data => {
                        console.log("listaDePrecio creado!!!");
                        console.log(data);
                        this.mostrarModalAgregar = false;
                        alert("\t\t\t\t¡ListaDePrecio agregado!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
                        window.location.reload();
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                        alert("\t\t\t\t¡ERROR al agregar ListaDePrecio!\n\nRevise los campos");
                    });;
    } else {
      alert("\t\t\t\t¡ERROR!\n\nDebe proporcionar al menos un nombre");
    }
  }*/