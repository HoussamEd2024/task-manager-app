import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTaskPageRoutingModule } from './add-task-routing.module';

import { AddTaskPage } from './add-task.page';
import { ReactiveFormsModule } from '@angular/forms';  


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTaskPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [AddTaskPage]
})
export class AddTaskPageModule {}
