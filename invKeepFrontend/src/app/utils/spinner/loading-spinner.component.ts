import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})

export class LoadingSpinnerComponent {

    isSpinnerDisplayed: boolean = true;

    //TODO: - 4 - now not that important - timeout 50s to be added
}