import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  imports: [],
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css',
})

export class ContadorComponent {
  contadorCifra: string = "0";

  functionAdd(){
    this.contadorCifra = (parseInt(this.contadorCifra) + 1).toString();
  }
  
  functionLess(){
    this.contadorCifra = (parseInt(this.contadorCifra) - 1).toString();
  }
}
