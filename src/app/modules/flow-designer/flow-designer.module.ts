import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowDesignerRoutingModule } from './flow-designer-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlowEditorComponent } from './flow-editor/flow-editor.component';



@NgModule({
  declarations: [FlowEditorComponent],
  imports: [
    CommonModule,
    FlowDesignerRoutingModule,
    DragDropModule
  ]
})
export class FlowDesignerModule { }
