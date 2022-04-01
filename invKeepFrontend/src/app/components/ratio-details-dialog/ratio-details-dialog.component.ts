import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
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

    constructor(public route: ActivatedRoute, public RatioDetailsService: RatioDetailsService,
        public dialogRef: MatDialogRef<RatioDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AnalyzedData /* TODO any only for experiments*/) {
            this.isLoading = false;
        if (data) {
            this.ratioName = data.name;
        }
    }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.assetId = paramMap.get(`assetId`);
            this.RatioDetailsService.getRatiosDetails(this.assetId).subscribe(ratiosDetailedInfos => {
                this.isLoading = false;
                this.ratiosInfos = ratiosDetailedInfos;
            });
        })
    }
}