import { Component } from '@angular/core';
import { User } from 'src/app/types/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = {
    name: '',
    password: '',
  };

  // constructor() {}

  login(formData: NgForm) {
    if (formData.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form Data:', formData);
    // Here, you'd implement your actual login logic, such as calling an authentication service
  }
}
