export class RequiredProduct {
  _id: string;
  name: string;
  unit: string;
  stock: number;
  cant?: number;
  percent: number;
  changeColor?: boolean = false;
  tipo?: number;
  movimientoProduccionFinalID?: string;
  add?: boolean;
}
