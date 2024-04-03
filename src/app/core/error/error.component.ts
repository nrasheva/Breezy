import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage = '';
  isShown = true;

  constructor(
    private errorService: ErrorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.errorService.apiError$.subscribe((err: HttpErrorResponse | null) => {
      if (err) {
        this.errorMessage =
          err.error?.message ||
          err.statusText ||
          'An unexpected error occurred';
      } else {
        this.errorMessage = '';
        this.isShown = false; 
      }
    });
  }

  hideError(): void {
    this.isShown = false;
  }

  onOkClick(): void {
    this.hideError();
    this.location.back(); 
  }
}
