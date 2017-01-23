//es el moviento final del proceso de produccion
import {Producto} from '../app_produccion/producto';

export class MovProductoFinal {
  _id: string;
  materiaPrimaUsada: Producto;
  prodSemiUsado: Producto;
  prodTermUsado: Producto;
  fecha: string;
  cantidadFabricada: number;
}
