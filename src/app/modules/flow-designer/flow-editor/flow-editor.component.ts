import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FlowEditorService } from '../flow-editor.service';
import { FlowComponent } from '../models/flow-component';

@Component({
  selector: 'n4-flow-editor',
  templateUrl: './flow-editor.component.html',
  styleUrl: './flow-editor.component.scss'
})
export class FlowEditorComponent implements AfterViewInit, OnInit {
  @ViewChild('leftBox') leftBox!: ElementRef;
  @ViewChild('rightBox') rightBox!: ElementRef;

  allowContainerDrag = true;

  availableFlowComponents: FlowComponent[] = [];

  leftBoxPosition = { x: 150, y: 200 };
  rightBoxPosition = { x: 600, y: 200 };
  pathData: string = '';

  draggingEnd: 'none' | 'left' | 'right' = 'none';
  mouseX: number = 0;
  mouseY: number = 0;



  constructor(private cdr: ChangeDetectorRef, private flowEditorService: FlowEditorService){ }
  ngOnInit(): void {
    this.availableFlowComponents = this.flowEditorService.getAvailableFlowComponents();
  }

  ngAfterViewInit(): void {
    this.updatePath();
  }

  moveContainer(){
    this.draggingEnd = 'left'
    this.allowContainerDrag = true
    this.updatePath();
  }

  moveContainerEnd(){
    this.allowContainerDrag = true
    this.updatePath();
    this.allowContainerDrag = false

  }

  onMouseDown(box: 'left' | 'right', event: MouseEvent): void {
    this.allowContainerDrag = false
    this.draggingEnd = box;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.updatePath();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.draggingEnd !== 'none') {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
    this.updatePath();
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.allowContainerDrag = true
    if (this.draggingEnd !== 'none') {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      
      this.updatePath();
      this.draggingEnd = 'none';
      this.allowContainerDrag = false
    }
    this.updatePath();
  }

  private updatePath(): void {
    if (this.leftBox && this.rightBox) {
      const leftBoxRect = this.leftBox.nativeElement.getBoundingClientRect();
      const rightBoxRect = this.rightBox.nativeElement.getBoundingClientRect();

      let startX = leftBoxRect.right;
      let startY = leftBoxRect.top + leftBoxRect.height / 2;
      let endX = rightBoxRect.left;
      let endY = rightBoxRect.top + rightBoxRect.height / 2;

      if (this.draggingEnd === 'left' && !this.allowContainerDrag) {
        endX = this.mouseX;
        endY = this.mouseY;
      }    
      else if (this.draggingEnd === 'right') {
        startX = this.mouseX;
        startY = this.mouseY;
      }

      const controlX1 = startX + (endX - startX) / 2;
      const controlY1 = startY;
      const controlX2 = startX + (endX - startX) / 2;
      const controlY2 = endY;

      // if (this.draggingEnd === 'left' && this.dragmode == 'queen') {
      //   console.log(`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`)
      // }  

      this.pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
      this.cdr.detectChanges();
    }
  }
}

