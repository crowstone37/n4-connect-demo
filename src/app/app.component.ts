import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DraggableBoxesComponent } from "./draggable-boxes/draggable-boxes.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, DraggableBoxesComponent]
})
export class AppComponent {
  title = 'n4-connect-local-demo';
}
