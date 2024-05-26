import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReteComponent } from "./debug/rete/rete.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ReteComponent]
})
export class AppComponent {
  title = 'n4-connect-local-demo';
}
