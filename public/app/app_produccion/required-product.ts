import { Producto } from './producto';

export class RequiredProduct {
  _id: string;
  productoNecesarioIDPrima: Producto;
  productoNecesarioIDSemi: Producto;
  productoNecesarioIDTerm: Producto;
  productoNecesario?: Producto;//Este es el producto necesario real, ya sea prima, semi o term
  porcentajeNecesario: number;
  cant?: number;
  changeColor?: boolean = false;
  tipo?: number;
  movimientoProduccionFinalID?: string;
  add?: boolean;
}
