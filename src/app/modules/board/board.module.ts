import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRoutingModule } from './board.routing.module';
import { UsersBoardComponent } from './users-board/users-board.component';



@NgModule({
  declarations: [
    UsersBoardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
