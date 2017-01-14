import { Component } from '@angular/core';

@Component({
  selector: 'timer',
  template: `<h1>{{minutos}}:{{segundos}}</h1>`,
})

export
class Timer {
	minutos: number;
	segundos: number;

	constructor(){
		this.minutos = 0;
		this.segundos = 0;
		setInterval(() => this.incrementarTimer(), 1000);
	}

	private incrementarTimer(): void{
		this.segundos++;
		if(this.segundos == 60){
			this.segundos = 0;
			this.minutos++;
		}
	}
}
