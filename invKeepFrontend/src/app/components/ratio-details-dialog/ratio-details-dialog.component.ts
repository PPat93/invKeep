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
        this.RatioDetailsService.getRatiosDetails(this.ratioName).subscribe(ratiosDetailedInfos => {
            // aassigning backend retrieved ratios to front variables and display those in Dialog
            // this.isLoading = false;
            // this.ratiosInfos = ratiosDetailedInfos;
            // this.testBackendDataDisplay=this.ratiosInfos[0].bulletPointSummary[0]
        })
    }
    closeDialog(){
        this.dialogRef.close()
    }
}