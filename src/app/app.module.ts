import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ListboxModule } from 'primeng/listbox';


import { AppComponent } from './component/app.component';
import { PatientComponent } from './component/patient.component';
import { EditPatientComponent } from './component/edit-patient.component';
import { ReservationComponent } from './component/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    EditPatientComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ListboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
