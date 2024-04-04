import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlePipe } from '../common/pipes/title.pipe';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TitlePipe
  ],
  exports: [
    TitlePipe
  ]
})
export class SharedModule { }
