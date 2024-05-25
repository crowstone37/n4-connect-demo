import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'n4-flow-editor',
  templateUrl: './flow-editor.component.html',
  styleUrl: './flow-editor.component.scss'
})
export class FlowEditorComponent {
  @ViewChild('leftBox') leftBox!: ElementRef;
  @ViewChild('rightBox') rightBox!: ElementRef;



  dragmode = 'queen';

  leftBoxPosition = { x: 50, y: 200 };
  rightBoxPosition = { x: 500, y: 200 };
  pathData: string = '';

  draggingEnd: 'none' | 'left' | 'right' = 'none';
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(private cdr: ChangeDetectorRef){

  }

  ngAfterViewInit(): void {
    this.updatePath();
  }

  moveContainer(){
    this.draggingEnd = 'left'
    this.dragmode = 'queen'
    this.updatePath();
  }

  moveContainerEnd(){
    this.dragmode = 'queen'
    this.updatePath();
    this.dragmode = 'king'

  }

  onMouseDown(box: 'left' | 'right', event: MouseEvent): void {
    this.dragmode = 'king';
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
    this.dragmode = 'queen';
    if (this.draggingEnd !== 'none') {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      
      this.updatePath();
      this.draggingEnd = 'none';
      this.dragmode = 'king';
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

      if (this.draggingEnd === 'left' && this.dragmode == 'king') {
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

