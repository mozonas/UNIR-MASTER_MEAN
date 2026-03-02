import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioP1Component } from './components/formulario-p1/formulario-p1.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormularioP1Component],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EjercicioFormularios01032026');
}
