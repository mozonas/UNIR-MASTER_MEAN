import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IHobby } from '../../interfaces/ihobby.interface';

@Component({
  selector: 'app-hobbies-list',
  imports: [FormsModule],
  templateUrl: './hobbie-list.component.html',
  styleUrl: './hobbie-list.component.css',
})
export class HobbiesListComponent {
  hobby: IHobby = { nombre: "", aficion: "" }
  arrayAficiones: IHobby[] = []

  /*
  guardarData() {
    this.arrayAficiones.push(this.hobby)
    console.log(this.arrayAficiones)
    // ¿por que se esta sustituyendo el anterior, el paso de datos por valor y por referencia? y solucionarlo
  }
  */

  guardarData() {
    this.arrayAficiones.push({...this.hobby})  // Crea una copia del objeto
    this.hobby = { nombre: "", aficion: "" }   // Limpia el formulario
    console.log(this.arrayAficiones)
  }

  guardarData2() {
    this.arrayAficiones.push(Object.assign({}, this.hobby))  // Crea una copia
    this.hobby = { nombre: "", aficion: "" }
    console.log(this.arrayAficiones)
  }

  pintarListado(){
    
  }
}