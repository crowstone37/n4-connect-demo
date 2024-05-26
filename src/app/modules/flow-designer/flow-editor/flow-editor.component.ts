import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FlowEditorService } from '../flow-editor.service';
import { FlowComponent } from '../models/flow-component';
import { Vector2 } from '../models/vector2';

@Component({
  selector: 'n4-flow-editor',
  templateUrl: './flow-editor.component.html',
  styleUrl: './flow-editor.component.scss',
})
export class FlowEditorComponent implements AfterViewInit, OnInit {
  @ViewChild('startPort') startPort!: ElementRef;
  @ViewChild('targetPort') targetPort!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  allowContainerDrag: boolean = true;
  availableFlowComponents: FlowComponent[] = [];

  startBoxPosition: Vector2 = { x: 150, y: 200 };
  targetBoxPosition: Vector2 = { x: 600, y: 200 };
  pathData: string = '';

  draggingEnd: 'none' | 'left' | 'right' = 'none';
  mouseX: number = 0;
  mouseY: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private flowEditorService: FlowEditorService
  ) {}
  ngOnInit(): void {
    this.availableFlowComponents =
      this.flowEditorService.getAvailableFlowComponents();
  }

  ngAfterViewInit(): void {
    this.updatePath();
  }

  moveContainer() {
    this.draggingEnd = 'left';
    this.allowContainerDrag = true;
    this.updatePath();
  }

  moveContainerEnd() {
    this.allowContainerDrag = true;
    this.updatePath();
    this.allowContainerDrag = false;
  }

  onMouseDown(box: 'left' | 'right', event: MouseEvent): void {
    this.allowContainerDrag = false;
    this.draggingEnd = box;
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.updateMousePosition(event);
    this.updatePath();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.draggingEnd !== 'none') {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }
    this.updateMousePosition(event);
    this.updatePath();
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.allowContainerDrag = true;
    if (this.draggingEnd !== 'none') {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;

      this.updateMousePosition(event);
      this.updatePath();
      this.draggingEnd = 'none';
      this.allowContainerDrag = false;
    }
    this.updatePath();
  }

  private updateMousePosition(event: MouseEvent): void {
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    this.mouseX = event.clientX - containerRect.left  + this.container.nativeElement.scrollLeft//+ window.scrollX;
    this.mouseY = event.clientY - containerRect.top + this.container.nativeElement.scrollTop;//+ window.scrollY;
  }
  private updatePath(): void {
    if (this.startPort && this.targetPort) {
      const startPortBounds = this.startPort.nativeElement.getBoundingClientRect();
      const targetPortBounds = this.targetPort.nativeElement.getBoundingClientRect();
      const containerRect = this.container.nativeElement.getBoundingClientRect();

      let startPort: Vector2 = {
        x: startPortBounds.x ,
        y: startPortBounds.y,
      };

      let targetPort: Vector2 = {
        x: targetPortBounds.left,
        y: targetPortBounds.y ,
      };

      if (this.draggingEnd === 'left' && !this.allowContainerDrag) {
        targetPort = { x: this.mouseX, y: this.mouseY };
      } else if (this.draggingEnd === 'right') {
        startPort = { x: this.mouseX, y: this.mouseY };
      }

      const bezierHandleStart: Vector2 = {
        x: startPort.x + (targetPort.x - startPort.x) / 2,
        y: startPort.y,
      };
      const bezierHandleTarget: Vector2 = {
        x: targetPort.x - (targetPort.x - startPort.x) / 2,
        y: targetPort.y,
      };

      this.pathData = `M ${startPort.x} ${startPort.y} C ${bezierHandleStart.x} ${bezierHandleStart.y}, ${bezierHandleTarget.x} ${bezierHandleTarget.y}, ${targetPort.x} ${targetPort.y}`;
      this.cdr.detectChanges();
    }
  }
  // private updatePath(): void {
  //   if (this.startPort && this.targetPort) {
  //     const startBoxBounds = this.startPort.nativeElement.getBoundingClientRect();
  //     const targetBoxBounds = this.targetPort.nativeElement.getBoundingClientRect();
  //     const containerRect = this.container.nativeElement.getBoundingClientRect();

  //     let startBox: Vector2 = {
  //       x: startBoxBounds.x,
  //       y: startBoxBounds.y //startBoxBounds.y - (containerRect.top) + this.container.nativeElement.scrollTop, //startBoxBounds.top + startBoxBounds.height / 2 - (containerRect.top / 2) + this.container.nativeElement.scrollTop ,
  //     };
  //     startBoxBounds.top - containerRect.top
  //     // console.log(   startBoxBounds.x, startBoxBounds.y - (startBoxBounds.bottom - startBoxBounds.top))
  //     // console.log(startBoxBounds.bottom - startBoxBounds.top)

  //     let targetBox: Vector2 = {
  //       x: targetBoxBounds.x,
  //       y: targetBoxBounds.y,        
  //     };

  //     if (this.draggingEnd === 'left' && !this.allowContainerDrag) {
  //       targetBox = { x: this.mouseX, y: this.mouseY };
  //     } else if (this.draggingEnd === 'right') {
  //       startBox = { x: this.mouseX, y: this.mouseY };
  //     }

  //     const bezierHandleStart: Vector2 = {
  //       x: startBox.x + (targetBox.x - startBox.x) / 2,
  //       y: startBox.y,
  //     };
  //     const bezierHandleTarget: Vector2 = {
  //       x: startBox.x - (targetBox.x - startBox.x) / 2,
  //       y: targetBox.y,
  //     };

  //     this.pathData = `M ${startBox.x} ${startBox.y} C ${bezierHandleStart.x} ${bezierHandleStart.y}, ${bezierHandleTarget.x} ${bezierHandleTarget.y}, ${targetBox.x} ${targetBox.y}`;
  //     this.cdr.detectChanges();
  //   }
  // }
}
