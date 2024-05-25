import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowDesignerRoutingModule } from './flow-designer-routing.module';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { FlowEditorComponent } from './flow-editor/flow-editor.component';
import { ComponentPickerComponent } from './flow-editor/component-picker/component-picker.component';
import { EditorFileMenuComponent } from './flow-editor/editor-file-menu/editor-file-menu.component';

@NgModule({
  declarations: [
    FlowEditorComponent,
    ComponentPickerComponent,
    EditorFileMenuComponent,
  ],
  imports: [
    CommonModule,
    FlowDesignerRoutingModule,
    DragDropModule,
    CdkDropList,
  ],
})
export class FlowDesignerModule {}
