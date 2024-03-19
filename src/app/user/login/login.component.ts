import { Component } from '@angular/core';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = {
    name: '',
    password: ''
  };

  // constructor() {}

  login(formData: User) {
    console.log('Form Data:', formData);
    // Here, you'd implement your actual login logic, such as calling an authentication service
  }
}
