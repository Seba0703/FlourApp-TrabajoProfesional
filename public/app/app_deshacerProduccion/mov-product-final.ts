//es el moviento final del proceso de produccion
import {Producto} from '../app_produccion/producto';

export class MovProductoFinal {
  _id: string;
  materiaPrimaFinal: Producto;
  prodSemiFinal: Producto;
  prodTermFinal: Producto;
  fecha: string;
  cantidadFabricada: number;
}
