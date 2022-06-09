import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RatioDetailsService } from "src/app/services/ratio-details.service";
import { RatioInfoObject } from "src/app/shared/sharedTS";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";

@Component({
    selector: 'ratio-details-dialog',
    templateUrl: 'ratio-details-dialog.component.html',
    styleUrls: ['ratio-details-dialog.component.scss']
})

export class RatioDetailsDialogComponent implements OnInit {

    private ratiosInfosUpdateSub: Subscription;

    assetId: string;
    ratiosInfos: RatioInfoObject = {
        name: ``,
        coAnalysis: [``],
        shortDescription: ``,
        extensiveDescription: ``,
        formula: [``, ``, ``],
        example: ``,
        bulletPointSummary: [``],
        intervals: {
            data: [{
                name: ``,
                numberRating: 0,
                summary: ``,
                verbalRating: ``
            }],
            values: [[0], [0]]
        }
    };

    isLoading: boolean = true;
    ratioName: string;

    constructor(public route: ActivatedRoute, public RatioDetailsService: RatioDetailsService,
        public dialogRef: MatDialogRef<RatioDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {
        if (data) {
            this.ratioName = data;
        }
    }

    ngOnInit() {
        this.RatioDetailsService.getRatiosDetails(this.ratioName)
            .subscribe(ratiosDetailedInfos => {
                this.ratiosInfos = ratiosDetailedInfos;
                this.isLoading = false;
            })

        this.ratiosInfosUpdateSub = this.RatioDetailsService.getRatiosDetailsListener()
            .subscribe(ratiosDetails => {
                this.ratiosInfos = ratiosDetails;
            })
    }

    rangeProcessing(range: number[]): string {
        let leftBoundry = (range[0] == null) ? `-&infin;` : range[0];
        let rightBoundry = (range[1] == null) ? `&infin;` : range[1];
        return `<b>Range:</b>&nbsp; ${leftBoundry} to ${rightBoundry}`;
    }

    closeDialog() {
        this.dialogRef.close()
    }

    ngOnDestroy(): void {
        this.ratiosInfosUpdateSub.unsubscribe();
    }
}