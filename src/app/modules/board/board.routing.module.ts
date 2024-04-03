import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersBoardComponent } from './users-board/users-board.component';



const routes: Routes = [
  {
    path: '',
    component: UsersBoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule { }
