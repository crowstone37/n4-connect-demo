import { Component, Input } from '@angular/core';
import { FlowComponent } from '../../models/flow-component';
import { FlowEditorService } from '../../flow-editor.service';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'n4-component-picker',
  templateUrl: './component-picker.component.html',
  styleUrl: './component-picker.component.scss'
})
export class ComponentPickerComponent {
  @Input() showComponentPicker: boolean = true;
  @Input() availableComponents: FlowComponent[] = [];

  public showDropZone: boolean = false;

  constructor(private flowEditorService: FlowEditorService){}


  drop(event: CdkDragDrop<FlowComponent[]>) {
    const droppedItem = event.item.data;
    if (this.isFlowComponent(droppedItem)){
      this.flowEditorService.addItemToFlow(droppedItem.type);
    }
    this.toggleDropZone(false);
  }

  isFlowComponent(obj: any): obj is FlowComponent {
    return 'type' in obj && 'label' in obj;
  }

  toggleDropZone(show: boolean){
    this.showDropZone = show;
  }
}
