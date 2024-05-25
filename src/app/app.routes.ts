import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'flow',
    loadChildren: () =>
      import('./modules/flow-designer/flow-designer.module').then(
        (m) => m.FlowDesignerModule
      ),
  },
  {
    path: '**',
    redirectTo: 'flow'
  }
];
