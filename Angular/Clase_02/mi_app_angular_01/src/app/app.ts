import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi_app_angular_01');
  nombre: string ='Miguel Ozonas Gregori';
  apellido: string ='Ozonas'
  nombres: string[] = ['Pedro','Pablo']

  pintarNombreCompleto() :string{
    return this.nombre+' ' + this.apellido
  }
}
