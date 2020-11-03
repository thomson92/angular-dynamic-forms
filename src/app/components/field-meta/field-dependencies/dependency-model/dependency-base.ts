import { MetaDependencyStatus } from 'src/app/constants/meta-dependency-status';
import { ValidationType } from 'src/app/constants/validation-types';
import { BaseField } from '../../../shared/field-model';
import { FieldDependenciesRegistryService } from '../../../../services/field-dependencies-registry.service';
import { Observable } from 'rxjs';

export abstract class DependencyBase {

    public isNotNegation = true;
    public validationType: ValidationType = ValidationType.requied;

    protected dependencyFieldRef: BaseField;

    private readonly owner: BaseField;
    private isSetup = false;
    private dependencyId: number;
    private status: MetaDependencyStatus;

    public constructor(owner: BaseField, private fieldDependenciesRegistryService: FieldDependenciesRegistryService) {
        this.owner = owner;
        this.status = MetaDependencyStatus.unset;
    }

    public abstract isDependencyConditionMet(): boolean;

    public getDependencyId(): number {
        return this.dependencyId;
    }

    public updateDependencyId(newDependencyId: number): void {
        this.isSetup = true;

        if (this.dependencyId) {
            this.fieldDependenciesRegistryService.unRegister(this);
        }

        this.dependencyId = newDependencyId;
        this.dependencyFieldRef = this.fieldDependenciesRegistryService.register(this);
    }

    public isSetupDone(): boolean {
        return this.isSetup;
    }

    public isValid(): boolean {
        const isVlaid = this.status === MetaDependencyStatus.valid;
        return isVlaid;
    }

    public getOwnerId(): number {
        return this.owner.id;
    }

    public getOwnerPath(): number[] {
        return this.owner.path;
    }

    public markAsDuplicate(): void {
        this.status = MetaDependencyStatus.duplicate;
    }

    public markAsValid(): void {
        this.status = MetaDependencyStatus.valid;
    }

    public getCurrentStatus(): MetaDependencyStatus {
        return this.status;
    }

    public removeDependency(): void {
        this.fieldDependenciesRegistryService.unRegister(this);
    }

    public getValueObservable(): Observable<any> {
        return this.dependencyFieldRef.getFormControlRef().valueChanges;
    }

    public hasDependingField(): boolean {
        return this.dependencyId !== undefined;
    }


}
