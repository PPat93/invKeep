import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss']
})

export class LoadingSpinnerComponent {

    isSpinnerDisplayed: boolean = true;

    //   showSpinner(): Promise<boolean> {

    //     if (this.spinnerVisible) {
    //       return new Promise((res) => {
    //         this.timeout = setTimeout(() => {
    //           console.log(`in timeout +  ${this.spinnerVisible}`);
    //           clearTimeout(this.timeout);
    //           this.spinnerVisible = false
    //           res(this.stopSpinner = false);
    //         }, 5000);
    //       })
    //     } else {
    //       console.log(`nope`)
    //       clearTimeout(this.timeout);

    //       return new Promise ((res) => {
    //         res(false);
    //       })
    //     }
    //   }

    //   async getData(): Promise<boolean> {
    //     console.log(`spinner return : ${await this.showSpinner()}`)
    //     return await this.showSpinner().then(() => {
    //       clearTimeout(this.timeout);
    //       return this.stopSpinner = false;
    //     });
    //   }


}