import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'invKeep';
  assetsArray = [];
  @Output() emiterson = new EventEmitter();

  onAssetAddition(receivedAsset){
    this.assetsArray.push(receivedAsset);
    this.emiterson.emit(this.assetsArray)
  }
}
