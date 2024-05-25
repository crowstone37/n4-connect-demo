import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowDesignerRoutingModule } from './flow-designer-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlowDesignerComponent } from './flow-designer/flow-designer.component';



@NgModule({
  declarations: [FlowDesignerComponent],
  imports: [
    CommonModule,
    FlowDesignerRoutingModule,
    DragDropModule
  ]
})
export class FlowDesignerModule { }
