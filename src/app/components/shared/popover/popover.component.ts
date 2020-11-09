import { Component, Input } from '@angular/core';
import { MessageType } from 'src/app/constants/message-types';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {

  @Input() public isEnabled = false;
  @Input() public textValue: string;
  @Input() public type: MessageType;
  public isVisible = false;

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
  }

}
