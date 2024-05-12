import { formatDate } from '@angular/common';
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
import { TokenService } from 'src/app/services/token.service';
import { WeatherService } from 'src/app/services/weather.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

constructor(private formBuilder: FormBuilder, private router: Router, private reservationService: ReservationService,
  private fieldService: FieldService,
  private sportTeamService: SportTeamService,
  private weatherService: WeatherService,
  private userTok: TokenService
) { }
userId!: any;
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
  this.userId = this.userTok.currentUser();
  this.addReservationForm = this.formBuilder.group({
    selectedDate: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    resStatus: ['pending'],
    resType: ['FreeForAll', Validators.required],
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
  const startDate = group.get('selectedDate')?.value;
  const startTime = group.get('startTime')?.value;
  const endTime = group.get('endTime')?.value;

  // Convert date and time strings to Date objects
  const startDateTime = new Date(`${startDate}T${startTime}`);
  const endDateTime = new Date(`${startDate}T${endTime}`);

  // Current date/time
  const currentDate = new Date();

  // Check if start date is greater than current date
  const isStartDateValid = startDateTime > currentDate;

  // Check if end time is greater than start time
  const isTimeRangeValid = startDateTime < endDateTime;

  // Calculate duration in minutes
  const durationMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);

  // Check if duration is within allowed range (2 hours)
  const isDurationValid = durationMinutes <= 120;

  // Return validation result
  return isStartDateValid && isTimeRangeValid && isDurationValid ? null : { invalidDateTimeRange: true };
}

// timeRangeValidator(group: FormGroup) {
//   const start = group.controls['startTime'].value;
//   const end = group.controls['endTime'].value;
//   const startHour = parseInt(start.split(':')[0], 10);
//   const endHour = parseInt(end.split(':')[0], 10);
//   const startMinute = parseInt(start.split(':')[1], 10);
//   const endMinute = parseInt(end.split(':')[1], 10);
//   const startMinutes = startHour * 60 + startMinute;
//   const endMinutes = endHour * 60 + endMinute;
//   const duration = endMinutes - startMinutes;
//   return duration <= 120 ? null : { timeRangeExceeded: true };
// }

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

onSubmit() {
  console.log('Form value:', this.addReservationForm.value);

  if (this.addReservationForm.invalid) {
    console.log('Form is invalid');
    console.log('Form errors:', this.addReservationForm.errors);
    console.log('Form controls validity:', this.addReservationForm.controls);

    Swal.fire({
      title: 'Error!',
      text: 'Please fill the Date Correctly.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  const { selectedDate, startTime, endTime, resStatus, resType, field, joinType } = this.addReservationForm.value;
  const fieldId = field.fieldId;

  const startDateString = selectedDate + 'T' + startTime; 
  const endDateString = selectedDate + 'T' + endTime;
 
  const startDateUTC = new Date(startDateString);
  const endDateUTC = new Date(endDateString);

  const timezoneOffset = startDateUTC.getTimezoneOffset();
 
  // const startDateAdjusted = new Date(startDateUTC.getTime() - timezoneOffset * 60000); 
  // const endDateAdjusted = new Date(endDateUTC.getTime() - timezoneOffset * 60000); 
  const startDateAdjusted = new Date(startDateUTC.getTime()); 
  const endDateAdjusted = new Date(endDateUTC.getTime()); 

  console.log('Making reservation with adjusted time:', startDateAdjusted, endDateAdjusted, resStatus, resType, fieldId);

  if (joinType === 'alone') {
    this.makeReservationForUser(startDateAdjusted, endDateAdjusted, resStatus, resType, fieldId); 
  } else if (joinType === 'team') {
    if (this.sportTeamId !== null) {
      this.makeTeamReservation(startDateAdjusted, endDateAdjusted, resStatus, resType, fieldId, this.sportTeamId);
    } else {
      console.error('Sport team ID is null');
    }
  }
  
}


makeTeamReservation(startDate: Date, endDate: Date, resStatus: string, resType: string, fieldId: number, sportTeamId: number): void {
  const reservation = { startDate, endDate, resStatus, resType };
  const captainId = this.userId;
  this.sportTeamService.makeTeamReservation(sportTeamId, captainId, fieldId, reservation).subscribe(
    (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'There is already a reservation on the selected date. Please choose another date.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
     
    },
    (response) => {
      Swal.fire({
        title: 'Reservation Submitted!',
        text: 'Your reservation has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.router.navigateByUrl('/all-reservations');
        }
      });
      // Error: Reservation failed
      
    }
  );
}

makeReservationForUser(startDate: Date, endDate: Date, resStatus: string, resType: string, fieldId: number): void {
  const reservation = { startDate, endDate, resStatus, resType };
  this.reservationService.makeReservationForUser(this.userId, fieldId, reservation).subscribe(
    (response) => {
      Swal.fire({
        title: 'Reservation Submitted!',
        text: 'Your reservation has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
    
          this.router.navigateByUrl('/all-reservations');
        }
      });
    },
    (error) => {
    
      Swal.fire({
        title: 'Error!',
        text: 'There is already a reservation on the selected date. Please choose another date.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
}

onDateSelectionChange(): void {
  const selectedDate = this.addReservationForm.get('selectedDate')?.value;
  if (selectedDate) {
    this.filterWeatherForecast(selectedDate);
  }
}

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
