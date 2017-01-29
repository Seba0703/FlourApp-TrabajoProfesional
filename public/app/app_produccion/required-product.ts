export class RequiredProduct {
  id: number;
  name: string;
  unit: string;
  stock: number;
  spend?: number;
  percent: number;
  changeColor?: boolean = false;
  tipo?: number;
  movimientoProduccionFinalID?: string;
}
