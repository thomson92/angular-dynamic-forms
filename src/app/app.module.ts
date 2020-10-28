import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormModelComponent } from './components/form-model/form-model.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldMetaComponent } from './components/field-meta/field-meta.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormModelComponent,
    FieldMetaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
