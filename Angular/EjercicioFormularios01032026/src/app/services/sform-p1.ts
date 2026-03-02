import { Injectable } from '@angular/core';
import { IForm } from '../models/i-form.interface';

@Injectable({
  providedIn: 'root',
})
export class SFormP1 {
  
  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  generarPassword(longitud: number = 12): string {
    // Definir los tipos de caracteres disponibles
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const especiales = '!@#$%^&*';
    
    // Combinar todos los caracteres
    const todosLosCaracteres = mayusculas + minusculas + numeros + especiales;
    
    let password = '';
    
    // Garantizar al menos un carácter de cada tipo para mayor seguridad
    password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
    password += minusculas[Math.floor(Math.random() * minusculas.length)];
    password += numeros[Math.floor(Math.random() * numeros.length)];
    password += especiales[Math.floor(Math.random() * especiales.length)];
    
    // Llenar el resto con caracteres aleatorios
    for (let i = password.length; i < longitud; i++) {
      password += todosLosCaracteres[Math.floor(Math.random() * todosLosCaracteres.length)];
    }
    
    // Mezclar los caracteres para que no queden en orden
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  procesarFormulario(form: IForm): IForm | null {
    // Validar que los campos no estén vacíos
    if (!form.username || !form.email) {
      return null;
    }

    // Validar que el email tenga formato correcto
    if (!this.validarEmail(form.email)) {
      return null;
    }

    // Generar la contraseña
    const passwordGenerado = this.generarPassword();

    // Retornar el formulario con la contraseña generada
    return {
      username: form.username,
      email: form.email,
      password: passwordGenerado
    };
  }
}
