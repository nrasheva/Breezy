import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage = '';

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.apiError$.subscribe((err: HttpErrorResponse | null) => {
      if (err) {
        this.errorMessage =
          err.error?.message || err.statusText || 'An unexpected error occurred';
      } else {
        this.errorMessage = '';
      }
    });
  }
}
