import { Producto } from './producto';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let productos = [
  {id: 11, name: 'Harina de trigo', unit: 'KG', merma: 0.03},
  {id: 12, name: 'Harina de soja', unit: 'KG', merma: 0.01},
  {id: 13, name: 'Harina de arroz', unit: 'KG', merma: 0.02},
  {id: 14, name: 'Masa faina', unit: 'KG', merma: 0.03},
  {id: 15, name: 'asdad', unit: 'KG', merma: 0.03},
  {id: 16, name: 'adasd', unit: 'KG', merma: 0.03},
  {id: 17, name: 'ssssss', unit: 'KG', merma: 0.05},
  {id: 18, name: 'sdadsd', unit: 'KG', merma: 0.01},
  {id: 19, name: 'adsda ddasdd', unit: 'KG', merma: 0.01},
  {id: 20, name: 'ssTosssssro', unit: 'KG', merma: 0.01}
    ];
    return {productos};
  }
}