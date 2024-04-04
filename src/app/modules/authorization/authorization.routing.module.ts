import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {
    path: 'signup',
    component: AuthComponent,
    data: { url: 'login', description: 'Already have an account? Log in', title: 'Sign up' },
  },
  {
    path: 'login',
    component: AuthComponent,
    data: { url: 'signup', description: 'Create an account', title: 'Log in' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
