import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BaseField } from '../components/shared/field-model';

@Injectable({
  providedIn: 'root'
})
export class FormModelProviderService {

  private onFormModelUpdate: BehaviorSubject<BaseField> = new BehaviorSubject<BaseField>(null);
  private currentFlatFieldModel: ReadonlyArray<BaseField> = new Array<BaseField>();

  public newModelEvent(newModel: BaseField): void {

    const flatModel = new Array<BaseField>();
    this.currentFlatFieldModel = this.setNewFlatFieldsModel(newModel, flatModel);

    this.onFormModelUpdate.next(newModel);
  }

  public listenToModelChanges(): Observable<BaseField> {
    return this.onFormModelUpdate.asObservable();
  }

  public getFlatFieldModel(): ReadonlyArray<BaseField> {
    return this.currentFlatFieldModel;
  }

  private setNewFlatFieldsModel(newModel: BaseField, flatCollection: BaseField[]): BaseField[] {
    flatCollection.push(newModel);

    if (newModel.nestedField) {
      newModel.nestedField.forEach(field => {
        this.setNewFlatFieldsModel(field, flatCollection);
      });
    }

    return flatCollection;
  }
}
