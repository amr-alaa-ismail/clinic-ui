import { Component, OnInit } from '@angular/core';
import { Patient } from '../model/patient.model';
import { PatientService } from '../service/patient.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'patient',
  templateUrl: '../view/patient.component.html',
  providers: [PatientService]
})
export class PatientComponent implements OnInit{
  
  filterParam: string;
  searchView: boolean = true;
  patients: Patient[] = [];
  patient: Patient;
  enableSpinning: boolean = false;


  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
  	this.getAllPatients();
  }

  search() {
  	if(this.filterParam && this.filterParam.trim().length > 0) {
		this.filterPatients();
	} else {
		this.getAllPatients();
	}
  }

  getAllPatients() {
  	this.enableSpinning = true;
  	this.patientService.getAll()
  		.then(respone => this.patients = respone)
  		.then(() => this.enableSpinning = false);
  }

  filterPatients() {
  	this.enableSpinning = true;
  	this.patientService.findByPhoneOrName(this.filterParam)
	  		.then(respone => this.patients = respone)
	  		.then(() => this.enableSpinning = false)
        .catch(() => this.enableSpinning = false);
  }

  addPatient() {
  	this.searchView = false;
  	this.patient = new Patient();
  }

  updatePatient(patient: Patient) {
  	this.searchView = false;
  	this.patient = patient;
  }

}
