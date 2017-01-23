import { Component } from '@angular/core';

@Component({
  selector: 'sign-out',
  template: `
        <strong>{{nombreUsuario}} &nbsp;</strong>
        <button (click)="signOut()" type="button" class="btn btn-info btn-circle signout-lg" title="Salir">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
        </button>
        `
})
export class SignOutComponent {
  private nombreUsuario: string;
  
  constructor(){
    let dataLogin = JSON.parse(sessionStorage.getItem("dataLogin"));
    
    this.nombreUsuario = dataLogin.nombreUsuario;
    console.log("NOMBRE: " + this.nombreUsuario);
  }

  signOut(){
    console.log("haciendo logout");
    location.href = "http://localhost:3000/index.html";
  }

}