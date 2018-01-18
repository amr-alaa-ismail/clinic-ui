import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient.model';
import { PatientService } from '../service/patient.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'reservation',
  templateUrl: '../view/reservation.component.html',
  providers: [PatientService]
})
export class ReservationComponent implements OnInit{
  
  isListView: boolean = true;
  patients: Patient[] = [];
  patient: Patient;
  enableSpinning: boolean = false;


  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
  	this.getTodayPatients();
  }

  getTodayPatients() {
  	this.enableSpinning = true;
  	this.patientService.getTodayPatients()
  		.then(respone => this.patients = respone)
  		.then(() => this.enableSpinning = false)
      .catch(() => this.enableSpinning = false)
  }

  refresh() {
    this.getTodayPatients();
  }

  updatePatient(patient) {
    this.isListView = false;
    this.patient = patient;
  }

}
