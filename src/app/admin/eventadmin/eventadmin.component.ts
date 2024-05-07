import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event-service.service';

@Component({
  selector: 'app-eventadmin',
  templateUrl: './eventadmin.component.html',
  styleUrls: ['./eventadmin.component.css']
})
export class EventadminComponent implements OnInit {
  events: Event[] = [];
  selectedFile: File | null = null;
  successMessage: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      (error) => {
        console.log('An error occurred: ' + error);
      }
    );
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        console.log('Event deleted successfully.');
        this.loadEvents();
        this.successMessage = 'Event deleted successfully.'; // Afficher le message de succès
        setTimeout(() => {
          this.successMessage = null; // Effacer le message après quelques secondes
        }, 3000);
      },
      (error) => {
        console.log('An error occurred: ' + error);
      }
    );
  }

  updateEvent(event: Event) {
    // Appeler la méthode updateEvent du service avec l'identifiant de l'événement et les données mises à jour
    this.eventService.updateEvent(event.eventId, event).subscribe(
      () => {
        console.log('Event updated successfully.');
        // Recharger la liste des événements après la mise à jour
        this.loadEvents();
      },
      (error) => {
        console.log('An error occurred: ' + error);
      }
    );
  }

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
}
