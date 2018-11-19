import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  /* VALIDATION */
  validateNumbers(e) {
    const pattern = /[0-9]/;

    const inputChar = String.fromCharCode(e.charCode);

    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  }
}
