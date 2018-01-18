import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from '../model/patient.model';
import { Comment } from '../model/comment.model';
import { Diagnosis } from '../model/diagnosis.model';
import { PatientService } from '../service/patient.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'edit-patient',
  templateUrl: '../view/edit-patient.component.html'
})
export class EditPatientComponent implements OnInit{
  
  diagnosis: SelectItem[] = [];
  comments: SelectItem[] = [];
  patientFound: boolean;
  localPatient: Patient;

  @Input() patient: Patient;
  @Output() cancelEdit = new EventEmitter<boolean>();
  @Output() updatePatients = new EventEmitter<Patient>();

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.localPatient = JSON.parse(JSON.stringify(this.patient));
    
    this.patientService.getComments()
      .then(response => {
        for(let comment of response) {
          this.comments.push({label: comment.comment, value: {"id": comment.id, "comment": comment.comment} });
        }
      });
    this.patientService.getDiagnosis()
      .then(response => {
        for(let diagnosis of response) {
          this.diagnosis.push({label: diagnosis.diagnosis, value: {"id": diagnosis.id, "diagnosis": diagnosis.diagnosis} });
        }
      });

    this.checkPatient();
  }

  cancel() {
    this.cancelEdit.emit(true);
  }

  savePatient() {
    if(this.patientFound) {
      this.patientService.update(this.localPatient)
        .then(patient => Object.assign(this.patient, patient))
        .catch(() => console.log("Failed to update patient"))
        .then(() => this.cancel());
    } else {
      this.patientService.save(this.localPatient)
        .then(patient => this.updatePatients.emit(patient))
        .catch(() => console.log("Failed to save patient"))
        .then(() => this.cancel());
    }
  }

  checkPatient() {
    if(this.patient.phone == null) {
      this.patientFound = false;
    } else {
      this.patientFound = true;
    }
  }
}
