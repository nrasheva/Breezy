import { Component } from '@angular/core';
import { User } from 'src/app/types/User';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = {
    id: '',
    email: '',
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login(formData: NgForm) {
    if (formData.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form Data:', formData);
    const { email, password } = formData.value;

    this.userService.login(email, password).subscribe(() => {
      this.router.navigate(['/air-quality']);
    });
  }
}
