import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { RatioDetailsService } from "src/app/services/ratio-details.service";
import { AnalyzedData } from "src/app/shared/sharedTS";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'ratio-details-dialog',
    templateUrl: 'ratio-details-dialog.component.html',
    styleUrls: ['ratio-details-dialog.component.scss']
})

export class RatioDetailsDialogComponent implements OnInit {

    assetId: string;
    ratiosInfos: AnalyzedData[];
    isLoading: boolean = true;
    ratioName: string;
    testBackendDataDisplay:string;

    constructor(public route: ActivatedRoute, private router: Router, public RatioDetailsService: RatioDetailsService,
        public dialogRef: MatDialogRef<RatioDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AnalyzedData) {
        if (data) {
            this.ratioName = data.name;
        }
    }

    ngOnInit() {
        let assetId = this.router.url.split(`s/`)
        this.RatioDetailsService.getRatiosDetails(assetId[1]).subscribe(ratiosDetailedInfos => {
            this.isLoading = false;
            this.ratiosInfos = ratiosDetailedInfos;
            this.testBackendDataDisplay=this.ratiosInfos[0].bulletPointSummary[0]
        })
    }
    closeDialog(){
        this.dialogRef.close()
    }
}