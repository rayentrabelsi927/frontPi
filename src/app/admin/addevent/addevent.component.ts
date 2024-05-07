// addevent.component.ts

import { Component } from '@angular/core';
import { EventService } from '../../services/event-service.service';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent {
  event: any = {
    titleEvent: '',
    capacityEvent: 0,
    descriptionEvent: '',
    locationEvent: '',
    dateEvent: '',
    categoryEvent: ''
  };
  selectedFile: File | null = null;
  subscription: any;

  constructor(private eventService: EventService) {}

  addEvent(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('titleEvent', this.event.titleEvent);
    formData.append('capacityEvent', this.event.capacityEvent.toString());
    formData.append('descriptionEvent', this.event.descriptionEvent);
    formData.append('locationEvent', this.event.locationEvent);
    formData.append('dateEvent', this.event.dateEvent);
    formData.append('images', this.selectedFile); 
    formData.append('categoryEvent', this.event.categoryEvent);

  
    this.subscription = this.eventService.addEvent(formData).subscribe({
      next: (data: any) => {
        console.log('Event added successfully:', data);
        // Reset form data or perform other necessary actions
      },
      error: (error: any) => {
        console.error('Error adding event:', error);
        // Handle the error
      }
    });
  }

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
  
}
