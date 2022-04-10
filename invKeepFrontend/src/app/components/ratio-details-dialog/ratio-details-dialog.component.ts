import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RatioDetailsService } from "src/app/services/ratio-details.service";
import { RatioInfoObject } from "src/app/shared/sharedTS";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'ratio-details-dialog',
    templateUrl: 'ratio-details-dialog.component.html',
    styleUrls: ['ratio-details-dialog.component.scss']
})

export class RatioDetailsDialogComponent implements OnInit {

    assetId: string;
    ratiosInfos: RatioInfoObject;
    isLoading: boolean = true;
    ratioName: string;

    constructor(public route: ActivatedRoute, private router: Router, public RatioDetailsService: RatioDetailsService,
        public dialogRef: MatDialogRef<RatioDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
        if (data) {
            this.ratioName = data;
        }
    }

    ngOnInit() {
        this.RatioDetailsService.getRatiosDetails(this.ratioName).subscribe(ratiosDetailedInfos => {
            this.ratiosInfos = ratiosDetailedInfos;
        })
    }

    closeDialog() {
        this.dialogRef.close()
    }
}