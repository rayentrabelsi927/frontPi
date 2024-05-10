import { Component } from '@angular/core';
import { EventService } from '../../services/event-service.service';
import Swal from 'sweetalert2';

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
    console.log('Event added successfully:', formData);

  
    this.subscription = this.eventService.addEvent(formData).subscribe({
      next: (data: any) => {
        console.log('Event added successfully:', data);
        // Afficher une alerte de succès
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Event added successfully!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          // Redirection ou autres actions nécessaires
        });
      },
      error: (error: any) => {
        console.error('Error adding event:', error);
        // Afficher une alerte d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add event',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        });
        // Gérer l'erreur
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