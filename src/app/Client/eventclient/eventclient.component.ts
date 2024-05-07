import { Component } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-eventclient',
  templateUrl: './eventclient.component.html',
  styleUrls: ['./eventclient.component.css']
})
export class EventclientComponent {
  events: Event[] = [];

  selectedEvent: any = null;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      (error) => {
        console.log('An error occurred: ' + error);
      }
    );
  }
  openEvent(event: Event): void {
    console.log('Event opened:', event);
}
toggleDetails(event: any) {
  if (this.selectedEvent === event) {
      this.selectedEvent = null; // Si l'événement sélectionné est déjà ouvert, fermez-le
  } else {
      this.selectedEvent = event; // Sinon, ouvrez l'événement sélectionné
  }
}
}
