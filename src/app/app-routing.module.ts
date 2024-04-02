import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainViewComponent } from './air-quality/main-view/main-view.component';
import { ErrorComponent } from './core/error/error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
  },
  { path: 'error', component: ErrorComponent },
  { path: 'air-quality', component: MainViewComponent },
  { path: '**', redirectTo: '/404' },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
