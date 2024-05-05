import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Field } from 'src/app/models/Field';
import { TypeR } from 'src/app/models/Reservation';
import { TypeF } from 'src/app/models/TypeF';
import { FieldService } from 'src/app/services/field.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SportTeamService } from 'src/app/services/sport-team.service';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

constructor(private formBuilder: FormBuilder, private router: Router, private reservationService: ReservationService,
  private fieldService: FieldService,
  private sportTeamService: SportTeamService,
  private weatherService: WeatherService
) { }
userId!: number;
addReservationForm!: FormGroup;
reservationTypes: string[] = Object.values(TypeR);
startDate!: Date;
endDate!: Date;  
fieldTypes: string[] = Object.values(TypeF);
fields: Field[] = [];
isUserCaptain: boolean = false;
sportTeamId: number | null = null; 
weatherForecast$: Observable<any> | undefined; 
weatherForecast: any;
maxDate!: Date;

fieldImages: { [key: string]: string } = {
  'Football': 'assets/img/football.jpg',
  'Basketball': 'assets/img/basketball.jpg',
  'Handball': 'assets/img/handball.jpg',
  'Volleyball': 'assets/img/volleyball.jpg',
  'Tennis': 'assets/img/tennis.jpg'
};
selectedFieldImageUrl: string = ''; 

ngOnInit() {
  this.weatherForecast$ = this.weatherService.getWeatherForecast();
  this.userId = 13;
  this.addReservationForm = this.formBuilder.group({
    selectedDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    resStatus: ['pending'],
    resType: ['', Validators.required],
    field: ['', Validators.required], 
    joinType: ['alone']
  }, { validators: this.timeRangeValidator });
  this.fieldService.getAllFields().subscribe(fields => {
    this.fields = fields;
    
  });

  this.weatherService.getWeatherForecast().subscribe(
    (data) => {
      this.weatherForecast = data;
    },
    (error) => {
      console.error('Error fetching weather forecast:', error);
    }
  );

  this.maxDate = new Date();
  this.maxDate.setDate(this.maxDate.getDate() + 5);
  
  this.checkIfUserIsCaptain();
}

timeRangeValidator(group: FormGroup) {
  const start = group.controls['startTime'].value;
  const end = group.controls['endTime'].value;
  const startHour = parseInt(start.split(':')[0], 10);
  const endHour = parseInt(end.split(':')[0], 10);
  const startMinute = parseInt(start.split(':')[1], 10);
  const endMinute = parseInt(end.split(':')[1], 10);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  const duration = endMinutes - startMinutes;
  return duration <= 120 ? null : { timeRangeExceeded: true };
}

// timeRangeValidator(group: FormGroup) {
//   const start = new Date(group.controls['startTime'].value);
//   const end = new Date(group.controls['endTime'].value);
//   const duration = (end.getTime() - start.getTime()) / (1000 * 60); // Convert milliseconds to minutes
//   return duration <= 120 ? null : { timeRangeExceeded: true };
// }



checkIfUserIsCaptain(): void {
  this.sportTeamService.isUserCaptain(this.userId).subscribe(
    (isCaptain: boolean) => {
      this.isUserCaptain = isCaptain;
      console.log('Is user a captain:', isCaptain);
      if (!isCaptain) {
        this.addReservationForm.patchValue({ joinType: 'alone' });
      } else {
       
        this.getSportTeamIdByCaptainId(this.userId);
      }
    },
    error => {
      console.error('Error checking if user is a captain:', error);
    }
  );
}

getSportTeamIdByCaptainId(captainId: number): void {
  this.sportTeamService.getSportTeamIdByCaptainId(captainId).subscribe(
    (teamId: number) => {
      this.sportTeamId = teamId;
      console.log('Sport team ID of the captain:', teamId);
    },
    error => {
      console.error('Error getting sport team ID of the captain:', error);
    }
  );
}

// onSubmit() {
//   if (this.addReservationForm.invalid) {
//     return;
//   }

//   const { selectedDate, startTime, endTime, resStatus, resType, field, joinType } = this.addReservationForm.value;
//   const fieldId = field.fieldId;

//   const startDate = new Date(selectedDate + 'T' + startTime);
//   const endDate = new Date(selectedDate + 'T' + endTime);

//   if (joinType === 'alone') {
//     this.makeReservationForUser(startDate, endDate, resStatus, resType, fieldId);
//   } else if (joinType === 'team') {
//     if (this.sportTeamId !== null) {
//       this.makeTeamReservation(startDate, endDate, resStatus, resType, fieldId, this.sportTeamId);
//     } else {
//       console.error('Sport team ID is null');
      
//     }
//   }
// }

onSubmit() {
  console.log('Form value:', this.addReservationForm.value);

  if (this.addReservationForm.invalid) {
    console.log('Form is invalid');
    console.log('Form errors:', this.addReservationForm.errors);
    console.log('Form controls validity:', this.addReservationForm.controls);
    return;
  }

  const { selectedDate, startTime, endTime, resStatus, resType, field, joinType } = this.addReservationForm.value;
  const fieldId = field.fieldId;

  const startDate = new Date(selectedDate + 'T' + startTime);
  const endDate = new Date(selectedDate + 'T' + endTime);

  console.log('Making reservation with:', startDate, endDate, resStatus, resType, fieldId);

  if (joinType === 'alone') {
    this.makeReservationForUser(startDate, endDate, resStatus, resType, fieldId);
  } else if (joinType === 'team') {
    if (this.sportTeamId !== null) {
      this.makeTeamReservation(startDate, endDate, resStatus, resType, fieldId, this.sportTeamId);
    } else {
      console.error('Sport team ID is null');
    }
  }
}

makeTeamReservation(startDate: Date, endDate: Date, resStatus: string, resType: string, fieldId: number, sportTeamId: number): void {
  const reservation = { startDate, endDate, resStatus, resType };
  const captainId = this.userId;
  this.sportTeamService.makeTeamReservation(sportTeamId, captainId, fieldId, reservation).subscribe(
    (response) => {
      
      this.router.navigateByUrl('/all-reservations');
    },
    (error) => {
     
      console.error('Error creating team reservation:', error);
      this.router.navigateByUrl('/all-reservations');
    }
  );
}

makeReservationForUser(startDate: Date, endDate: Date, resStatus: string, resType: string, fieldId: number): void {
  const reservation = { startDate, endDate, resStatus, resType };
  const userId = this.userId;
  this.reservationService.makeReservationForUser(userId, fieldId, reservation).subscribe(
    (response) => {
     
      this.router.navigateByUrl('/all-reservations');
    },
    (error) => {
  
      console.error('Error creating reservation:', error);
      this.router.navigateByUrl('/all-reservations');
    }
  );
}


onDateSelectionChange(): void {
  const selectedDate = this.addReservationForm.get('selectedDate')?.value;
  if (selectedDate) {
    this.filterWeatherForecast(selectedDate);
  }
}

// filterWeatherForecast(selectedDate: string): void {
//   this.weatherForecast.list = this.weatherForecast.list.filter((forecast: any) => {
//     return forecast.dt_txt.includes(selectedDate);
//   });
// }
filterWeatherForecast(selectedDate: string): void {
 
  const filteredForecasts = this.weatherForecast.list.filter((forecast: any) => {
    return forecast.dt_txt.includes(selectedDate);
  });
  if (filteredForecasts.length > 0) {
    this.weatherForecast.list = filteredForecasts;
  } else {
    this.weatherForecast.list = [];
  }
}


isNoonForecast(forecast: any): boolean {
  return forecast.dt_txt.includes(this.addReservationForm.get('selectedDate')?.value) &&
         forecast.dt_txt.includes('12:00:00');
}

convertKelvinToCelsius(tempKelvin: number): number {
  return tempKelvin - 273.15;
}

hasForecastForSelectedDate(): boolean {
  const selectedDate = this.addReservationForm.get('selectedDate')?.value;
  console.log('selected date:', selectedDate);
  if (!selectedDate || !this.weatherForecast || !this.weatherForecast.list) {
    return false;
    
  }
  return this.weatherForecast.list.some((forecast: any) => forecast.dt_txt.includes(selectedDate));
}


getWeatherIconUrl(description: string): string {
  console.log('Weather description:', description);
  switch (description.toLowerCase()) {
    case 'clear sky':
      return 'assets/img/clear sky.png';

    case 'overcast clouds':
      return 'assets/img/overcast clouds.png';

    case 'scattered clouds':
      return 'assets/img/scattered clouds.png';

    case 'rain':
      return 'assets/img/rain.png';

    case 'thunderstorm':
      return 'assets/img/thunderstorm.png';

    case 'broken clouds':
      return 'assets/img/shower rain.png';

    case 'light rain':
      return 'assets/img/light-rain.png';

    default:
      return ''; 
  }
}





}