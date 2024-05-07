import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateevent',
  templateUrl: './updateevent.component.html',
  styleUrls: ['./updateevent.component.css']
})
export class UpdateeventComponent implements OnInit {
  constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = +params['eventId']; 
      console.log('Event ID:', this.eventId); 
      this.loadEvents();
    });
  }

  eventId: number | null = null;  
  event: any = {
    titleEvent: '',
    capacityEvent: 0,
    descriptionEvent: '',
    locationEvent: '',
    dateEvent: '',
    categoryEvent: ''
  };
  selectedFile: any;

  loadEvents() {
    this.eventService.getAllEvents().subscribe(
      (events: Event[]) => {
        this.event = events;
      },
      (error) => {
        console.log('An error occurred: ' + error);
      }
    );
  }

  updateEvent(event: Event) {
    
    this.eventService.updateEvent(event.eventId, event).subscribe(
      () => {
        console.log('Event updated successfully.');
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
