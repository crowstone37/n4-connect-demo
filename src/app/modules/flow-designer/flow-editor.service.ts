import { Injectable } from '@angular/core';
import { FlowComponent } from './models/flow-component';
import { FlowItem } from './models/flow-item';

@Injectable({
  providedIn: 'root'
})
export class FlowEditorService {

  flowItems: FlowItem[] = [

  ]

  getAvailableFlowComponents(): FlowComponent[] {
    return [
      {label: 'ExampleBox', type: 'exampleBox'},
      {label: 'ExampleBox2', type: 'exampleBox2'},
    ]
  }

  addItemToFlow(type: string){
    this.flowItems.push(
      {
        id: this.flowItems.length.toString(),
        type: type
      }
    )
    console.log(this.flowItems)
  }
}
