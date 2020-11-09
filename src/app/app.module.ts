import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormModelComponent } from './components/form-model/form-model.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldMetaComponent } from './components/field-meta/field-meta.component';
import { FormViewComponent } from './components/form-view/form-view.component';
import { ViewRefProviderDirective } from './directives/view-ref-provider.directive';
import { DependencyComponent } from './components/field-meta/field-dependencies/dependency.component';
import { CheckboxFieldComponent } from './components/field-view/checkbox-field/checkbox-field.component';
import { GroupFieldComponent } from './components/field-view/group-field/group-field.component';
import { TextAreaComponent } from './components/field-view/text-area/text-area.component';
import { PopoverComponent } from './components/shared/popover/popover.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FormModelComponent,
    FieldMetaComponent,
    FormViewComponent,
    ViewRefProviderDirective,
    TextAreaComponent,
    GroupFieldComponent,
    CheckboxFieldComponent,
    DependencyComponent,
    PopoverComponent
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
