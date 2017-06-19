import {Component, OnInit, ViewChild} from '@angular/core';
import {RetencionServices} from "./retencionServices";
import {Retencion} from "./retencion";
import {RangoRetencion} from "./RangoRetencion";

@Component({
  selector: 'retenciones-app',
  templateUrl: 'app/app_retenciones/app.component.html'
})

export class AppComponent implements OnInit{

  ADD_RETENCION: string= "Agregar retención";
  MOD_RETENCION: string = "Modificar retención";
  retenciones: Retencion[];
  retencionesBack: Retencion[];
  retencion: Retencion;
  currentIndex: number;
  titulo : string = "";

  constructor(private retencionService: RetencionServices) { }

  getReteciones() {
    this.retencionService.getRetenciones().then(retenciones => {
      this.retenciones = retenciones;
      this.retencionesBack = [];
      for (var i = 0; i < retenciones.length; i++) {
        this.retencionesBack.push(Retencion.clone(retenciones[i]));
      }
    });
  }

  ngOnInit(): void {
    this.getReteciones();
  }

  nuevo() {
    this.retencion = new Retencion();
    this.titulo = this.ADD_RETENCION;
  }

  modificar(retencion: Retencion, i: number) {
    this.retencion = retencion;
    this.currentIndex = i;
    this.titulo = this.MOD_RETENCION;
  }

  borrar(_id: string) {
    this.retencionService.deleteRetencion(_id).then(() => {
      alert("\t\t\t\t¡Se borro existosamente!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
      window.location.reload();
    });
  }

  guardarModificaciones() {
    if (this.checkItems() && this.nombreCompleto()) {
      if (this.retencion._id) {
        this.retencionService.modificar(this.retencion).then(retencion => {
          alert("\t\t\t\t¡Retención modificada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
          window.location.reload();
        });
      } else {
        this.retencionService.addRetencion(this.retencion).then(retencion => {
          alert("\t\t\t\t¡Retención guardada!\n\nPulse 'Aceptar' para actualizar y visualizar los cambios");
          window.location.reload();
        });
      }
    }
  }

  nuevoItem() {
    this.retencion.rangos_ids.push(new RangoRetencion());
  }

  borrarItem(i: number) {
    var itemBorrado: RangoRetencion = this.retencion.rangos_ids.splice(i, 1)[0];//siempre borro uno
    if (itemBorrado._id) {
      if (this.retencion.rangosDelete_ids) {}
      else {
        this.retencion.rangosDelete_ids = [];
      }
      this.retencion.rangosDelete_ids.push(itemBorrado._id);
    }

  }

  private checkItems(): boolean {
    var rangos = this.retencion.rangos_ids;

    var i = rangos.length - 1;
    var err: boolean = false;

    while (i >= 0 && !err) {

      if (rangos[i].desde) {
        if (rangos[i].hasta) {
          if (rangos[i].desde > rangos[i].hasta) {
            err = true;
            alert("\t\t\t\t¡Validación!\n\nDesde debe ser menor y distinto que hasta.");
          }
        } else {
          err = true;
          alert("\t\t\t\t¡Validación!\n\nDebe indicar un importe Hasta.");
        }
      } else if (rangos[i].hasta) {
        err = true;
        alert("\t\t\t\t¡Validación!\n\nDebe indicar un importe Desde.");
      } else {
        rangos.splice(i, 1);
      }

      if (rangos[i].porcentaje > 100 || rangos[i].porcentaje < 0) {
        err = true;
        alert("\t\t\t\t¡Validación!\n\nEl porcentaje debe estar entre 0 y 100.");
      }

      i--;
    }

    return !err;
  }

  private nombreCompleto(): boolean {
    if (this.retencion.nombre == null || this.retencion.nombre.length == 0) {
      alert("\t\t\t\t¡Validación!\n\nDebe completar el nombre de la retención.");
      return false;
    }
    return true;
  }

  public cancelar() {
    this.retenciones[this.currentIndex] = Retencion.clone(this.retencionesBack[this.currentIndex]);
  }

}