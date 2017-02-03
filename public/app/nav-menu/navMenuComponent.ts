import { Component, Input } from '@angular/core';

@Component({
  selector: 'nav-menu',
  templateUrl: "app/nav-menu/navMenuComponent.html"
})
export class NavMenuComponent {
  @Input() origen: string;
  activeH: string = "";
  activeC: string = "";
  activeP: string = "";

  activeProductos: string = "";
  activeMP: string = "";
  activeSP: string = "";
  activePT: string = "";
  
  activeProduccion: string = "";
  activeF: string = "";
  activeD: string = "";

  activeLP: string = "";
  activeU: string = "";
  
  constructor(){}

  ngOnInit() {
      console.log("ORIGEN= " + this.origen);

      switch (this.origen) {
        case "home":
          this.activeH = "active";
          break;
        case "clientes":
          this.activeC = "active";
          break;
        case "proveedores":
          this.activeP = "active";
          break;
        case "materiasPrima":
          this.activeMP = "active";
          this.activeProductos = "active";
          break;
        case "semiProcesados":
          this.activeSP = "active";
          this.activeProductos = "active";
          break;
        case "productosTerminados":
          this.activePT = "active";
          this.activeProductos = "active";
          break;
          case "fabricar":
          this.activeF = "active";
          this.activeProduccion = "active";
          break; 
          case "deshacer":
          this.activeD = "active";
          this.activeProduccion = "active";
          break;
          case "listaDePrecios":
          this.activeLP = "active";
          break;
          case "usuarios":
          this.activeU = "active";
          break;           
        default:
          this.activeH = "active";
          break;
      }
  }
}