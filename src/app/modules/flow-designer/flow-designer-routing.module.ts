import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowEditorComponent } from './flow-editor/flow-editor.component';

const routes: Routes = [
  {
    path: '',
    component: FlowEditorComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowDesignerRoutingModule { }