import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-up',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/authorization/authorization.module').then((m) => m.AuthorizationModule),
  },
  {
    path: 'board',
    loadChildren: () => import('./modules/board/board.module').then((m) => m.BoardModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
