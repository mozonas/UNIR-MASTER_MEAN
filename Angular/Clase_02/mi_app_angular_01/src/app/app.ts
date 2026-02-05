import { Component } from '@angular/core';
import { ContadorComponent } from './components/contador/contador.component';

@Component({
  selector: 'app-root',
  imports: [ContadorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('mi_app_angular_01');
  nombre: string ='Miguel Ozonas Gregori';
  apellido: string ='Ozonas'
  nombres: string[] = ['Pedro','Pablo']

  pintarNombreCompleto() :string{
    return this.nombre+' ' + this.apellido
  }
}

