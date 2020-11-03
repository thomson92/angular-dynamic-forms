import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ViewRefProviderDirective } from 'src/app/directives/view-ref-provider.directive';
import { BaseField } from '../../shared/field-model';
import { GroupBaseComponent } from '../base-field/base-group-field.component';

@Component({
  selector: 'app-group-field',
  templateUrl: './group-field.component.html',
  styleUrls: ['./group-field.component.scss']
})
export class GroupFieldComponent extends GroupBaseComponent implements OnInit, OnDestroy {

  @Input()
  public fieldData: BaseField;

  @Input()
  public nestedFields: BaseField[] = new Array<BaseField>();

  @ViewChildren(ViewRefProviderDirective)
  public fieldComponents: QueryList<ViewRefProviderDirective>;

  constructor(protected cdr: ChangeDetectorRef) {
    super(cdr);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
