import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewRefProvider]'
})
export class ViewRefProviderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
