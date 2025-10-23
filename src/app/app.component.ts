import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './components/card-list/card-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CardListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Card Manager App';
}
