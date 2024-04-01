import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isLoggedIn$.subscribe({
      next: isLoggedIn => {
        console.log(`isLoggedIn emitted: ${isLoggedIn}`);
        this.isAuthenticating = false;
      },
      error: error => {
        console.error('Failed to authenticate:', error);
        this.isAuthenticating = false;
      },
      complete: () => {
        console.log('Observable completed.');
        this.isAuthenticating = false;
      },
    });
  }
}
