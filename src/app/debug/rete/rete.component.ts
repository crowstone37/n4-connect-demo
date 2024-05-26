import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  ViewChild,
} from '@angular/core';
import { createEditor } from './editor';

@Component({
  selector: 'n4-rete',
  standalone: true,
  imports: [],
  templateUrl: './rete.component.html',
  styleUrl: './rete.component.scss',
})
export class ReteComponent implements AfterViewInit {
  @ViewChild('rete') container!: ElementRef;

  constructor(private injector: Injector) {}


  ngAfterViewInit(): void {
    const el = this.container.nativeElement;

    if (el) {
      createEditor(el, this.injector);
    }
  }
}
