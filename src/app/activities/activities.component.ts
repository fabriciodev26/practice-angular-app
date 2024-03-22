import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css',
})
export class ActivitiesComponent {
  activities = [
    {
      id: 1,
      action: 'Limpiar',
    },
    {
      id: 2,
      action: 'Barrer',
    },
    {
      id: 3,
      action: 'Planchar',
    },
    {
      id: 4,
      action: 'Cocinar',
    },
  ];
  @Input() nombre = '';
}
