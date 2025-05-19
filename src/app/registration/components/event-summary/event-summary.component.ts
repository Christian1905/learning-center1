import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './event-summary.component.html',
  styleUrl: './event-summary.component.css'
})
export class EventSummaryComponent {
  @Input() event!: Event;
  @Input() checkedInCount: number = 0;
  @Input() averageRating: number | null = null;
}
