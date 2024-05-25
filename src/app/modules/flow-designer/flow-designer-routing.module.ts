import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowDesignerComponent } from './flow-designer/flow-designer.component';

const routes: Routes = [
  {
    path: '',
    component: FlowDesignerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowDesignerRoutingModule { }