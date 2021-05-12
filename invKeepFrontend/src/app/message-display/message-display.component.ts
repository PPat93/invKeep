import {Component} from "@angular/core";

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss']
})

export class MessageDisplayComponent {

  closeMessage(e) {
    let classNameElement = e.currentTarget;
    let elementCheck: string = ``;
    let i: number = 0;
    while (!elementCheck.match('message')) {
      classNameElement = classNameElement.offsetParent;
      elementCheck = classNameElement.className;
      if (elementCheck.match('message')) {
        classNameElement.remove();
      }
      //safety so while is not infinite
      if (i >= 10) {
        break;
      }
    }
  }
}
