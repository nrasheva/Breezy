import { Component } from '@angular/core';
import { User } from 'src/app/types/User';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    id: '',
    email: '',
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  register(formData: NgForm) {
    if (formData.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form Data:', formData);

    const { email, password } = formData.value;

    this.userService.register(email, password).subscribe({
      next: () => {
        // Navigate to login or show success message
        this.router.navigate(['/login']);
      },
      error: error => {
        // Handle error scenario, such as showing an error message to the user
        console.error('Registration failed:', error);
      },
    });
  }
}
