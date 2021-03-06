import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageType } from 'src/app/constants/message-types';
import { MetaDependencyStatus } from 'src/app/constants/meta-dependency-status';
import { ValidationType } from 'src/app/constants/validation-types';
import { FormModelProviderService } from '../../../services/form-model-provider.service';
import { BaseField } from '../../shared/field-model';
import { DependencyBase } from './dependency-model/dependency-base';

@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.scss']
})
export class DependencyComponent implements OnInit {

  @Input()
  public dependencyData: DependencyBase;

  @Output()
  public dependencyFieldSelected = new EventEmitter<DependencyBase>();

  @Output()
  public dependencyRemoved = new EventEmitter<DependencyBase>();

  public dependencyId: number;

  public availableDependenciesToPick: ReadonlyArray<BaseField> = new Array<BaseField>();
  public validationTypes: typeof ValidationType = ValidationType;

  constructor(private formModelProviderService: FormModelProviderService) { }

  public ngOnInit(): void {
    this.formModelProviderService.listenToModelChanges().subscribe(() => {
      this.availableDependenciesToPick = this.formModelProviderService
        .getFlatFieldModel()
        .filter(field =>
          field.isConfigured &&
          field.id !== this.dependencyData.getOwnerId() && // exclude self
          !DependencyComponent.isAncestor(field, this.dependencyData.getOwnerPath())); // exclude ancestors
    });
  }

  public getMessageType(): MessageType {
    const status = this.dependencyData.getCurrentStatus();
    let messegeType: MessageType;

    switch (status) {
      case MetaDependencyStatus.valid:
        messegeType = MessageType.info;
        break;
      default:
        messegeType = MessageType.warning;
        break;
    }

    return messegeType;
  }

  public dependencySelectionChange(id: number): void {
    this.dependencyData.updateDependencyId(id);
    this.emitNewDependencyModel();
  }

  public dependencyValidationTypeChange(event: ValidationType): void {
    this.dependencyData.validationType = event;
    this.emitNewDependencyModel();
  }

  public negationChange(event: boolean): void {
    this.dependencyData.isNotNegation = event;
    this.emitNewDependencyModel();
  }

  public dependencyRemove(): void {
    this.dependencyRemoved.emit(this.dependencyData);
  }

  private static isAncestor(fieldToCheck: BaseField, ownerPath: number[]): boolean {
    const isAncestor = fieldToCheck.isMyDescendant(ownerPath);
    return isAncestor;
  }

  private emitNewDependencyModel(): void {
    if (this.dependencyData.isSetupDone()) {
      this.dependencyFieldSelected.emit(this.dependencyData);
    }
  }
}
