import { Component } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css',
})
export class CardDetailComponent {
  username = 'fabriciodev26';
  isLoggedIn = true;
  value = 0;
  increment() {
    this.value++;
  }
  decrement() {
    this.value--;
  }
}
