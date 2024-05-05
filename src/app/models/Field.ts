import { TypeF } from "./TypeF";

export interface Field {
    fieldId: number;
    nameField: string;
    descriptionField: string;
    locationField: string;
    capacityField: number;
    typeField: TypeF;
    reservations?: Reservation[];
  }
  

  
  export interface Reservation {
    userId(userId: any, reservationId: number, updatedReservation: any): unknown;
    // Define the Reservation model if needed
  }
  
