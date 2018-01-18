import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Patient } from '../model/patient.model'
import { Diagnosis } from '../model/diagnosis.model'
import { Comment } from '../model/comment.model'

@Injectable()
export class PatientService {

	patient: Patient;

	constructor(private http: Http) { } 

    getAll(): Promise<Patient[]> {
        return this.http.get('http://localhost:3000/patients')
        .toPromise()
        .then(response => response.json()._embedded.patients)
        .catch(() => console.log("Error retrieving patients"));
    }

    findByPhoneOrName(filterParam: string): Promise<Patient[]> {
    	return this.http.get('http://localhost:3000/patients/search/byFilter', {
    		params: {
    			"phone": filterParam,
    			"firstName": filterParam,
    			"lastName": filterParam
    		}
    	} )
        .toPromise()
        .then(response => response.json()._embedded.patients)
        .catch(() => console.log("Error searching patients"));
    }

    findById(id: number): Promise<Patient> {
        return this.http.get('http://localhost:3000/patients/search/findById?id=' + id)
        .toPromise()
        .then(response => response.json())
    }

    save(patient: Patient): Promise<any> {
        this.adjustComments(patient);
        this.adjustDiagnosis(patient);
    	return this.http.post('http://localhost:3000/patients', patient)
        .toPromise()
        .then(response => {
            return this.getPatientFromResponse(response);
        })
    }

    update(patient: Patient): Promise<any> {
        this.adjustComments(patient);
        this.adjustDiagnosis(patient);
    	return this.http.patch('http://localhost:3000/patients/'+patient.id, patient)
        .toPromise()
        .then(response => {
            return this.getPatientFromResponse(response);
        });
    }

    private getPatientFromResponse(response) {
        let href = response.json()._links.self.href.split('/');
        let patientId = href[href.length-1];
        return this.findById(patientId)
            .then(response => response)
            .catch(() => console.log('Failed to retrieve after save'))
    }

    getTodayPatients(): Promise<Patient[]> {
    	let date = new Date(Date.now());
        let formattedDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    	return this.http.get('http://localhost:3000/patients/search/byDate', {
    		params: {
    			"createdAt": formattedDate,
                "updatedAt": formattedDate
    		}
    	} )
        .toPromise()
        .then(response => response.json()._embedded.patients)
        .catch(() => console.log("Error searching patients"));
    }

    getComments(): Promise<Comment[]> {
        return this.http.get('http://localhost:3000/comments')
        .toPromise()
        .then(response => response.json()._embedded.comments)
        .catch(() => console.log("Error retrieving comments"));
    }

    getDiagnosis(): Promise<Diagnosis[]> {
        return this.http.get('http://localhost:3000/diagnosis')
        .toPromise()
        .then(response => response.json()._embedded.diagnoses)
        .catch(() => console.log("Error retrieving diagnosis"));
    }

    private adjustComments(patient: Patient) {
        if(!patient.comments || patient.comments.length == 0) {
            patient.comments = [];
            return;
        }
        let comments = [];
        for(let comment of patient.comments) {
          comments.push("http://localhost:3000/comments/" + comment.id);
        }
        patient.comments = comments;
    }

    private adjustDiagnosis(patient: Patient) {
        if(!patient.diagnosis || patient.diagnosis.length == 0) {
            patient.diagnosis = [];
            return;
        }
        let diagnoses = [];
        for(let diagnosis of patient.diagnosis) {
          diagnoses.push("http://localhost:3000/diagnosis/" + diagnosis.id);
        }
        patient.diagnosis = diagnoses;
    }
}