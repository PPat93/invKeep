import {Component, Input} from "@angular/core";
import {welcomeMsg} from "../../shared/sharedTS";

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss']
})

export class MessageDisplayComponent {

  @Input() id: string;

  chooseContent(): { title: string, msg: string } {
    let messageData: { title: string, msg: string };
    switch (this.id) {
      case `welcomeMsg`:
        messageData = {
          title: welcomeMsg.title,
          msg: welcomeMsg.msg
        }
        return messageData;
      default:
        console.error(`Message component ID not recognised.`)
        break;
    }
  }

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
