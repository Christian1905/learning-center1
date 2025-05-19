import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { EventSummaryComponent } from '../../../../registration/components/event-summary/event-summary.component';
import { EventService } from '../../../../registration/services/event.service';
import { Event } from '../../../../registration/models/event';
import { forkJoin, map } from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslatePipe,
    CommonModule,
    TranslateModule,
    MatGridListModule,
    EventSummaryComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  events: Array<{
    event: Event;
    checkedInCount: number;
    averageRating: number | null;
  }> = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  private loadEvents() {
    this.eventService.getEvents().subscribe(events => {
      const eventStats = events.map(event => 
        this.eventService.getEventWithStats(event.id)
      );

      forkJoin(eventStats).subscribe(stats => {
        this.events = stats;
      });
    });
  }
}
