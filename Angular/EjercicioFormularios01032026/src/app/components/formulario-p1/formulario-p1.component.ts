import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SFormP1 } from '../../services/sform-p1';
import { IForm } from '../../models/i-form.interface';

@Component({
  selector: 'app-formulario-p1',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-p1.component.html',
  styleUrl: './formulario-p1.component.css',
})

export class FormularioP1Component {
  form: FormGroup;
  
  constructor(private sformP1: SFormP1) {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
      ]),
    });
  }

    checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.form.get(controlName)?.hasError(errorName) && this.form.get(controlName)?.touched
    }
    // Validacion regex cuando haga falta: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
    // tambien hay que controlar que el nombre no esté vacío, ninguno de los dos campos puede estar vacío
    resultado: IForm | null = null;

    onSubmit() {
      if (this.form.valid) {
        // pasar los valores al servicio para generar password
        this.resultado = this.sformP1.procesarFormulario(this.form.value as IForm);
        console.log('Resultado del servicio', this.resultado);
        alert(`Formulario procesado:\nUsername: ${this.resultado?.username}\nEmail: ${this.resultado?.email}\nPassword: ${this.resultado?.password}`);
      }
    }
}
