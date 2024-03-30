import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing-module';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomLocationComponent } from './profile/custom-location/custom-location.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, CustomLocationComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, FontAwesomeModule],
})
export class UserModule {}
