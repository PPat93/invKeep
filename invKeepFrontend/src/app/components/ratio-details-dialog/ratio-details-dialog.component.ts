import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { RatioDetailsService } from "src/app/services/ratio-details.service";
import { AnalyzedData } from "src/app/shared/sharedTS";

@Component({
    selector: 'asset-details-dialog',
    templateUrl: 'asset-details-dialog.component.html',
    styles: ['asset-details-dialog.componeent.scss']
})

export class RatioDetailsDialogComponent implements OnInit {

    assetId: string;
    ratiosInfos: AnalyzedData[];
    isLoading: boolean = true;

    constructor(public route: ActivatedRoute, public RatioDetailsService: RatioDetailsService) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.assetId = paramMap.get(`assetId`);
            this.RatioDetailsService.getRatiosDetails(this.assetId).subscribe(ratiosDetailedInfos => {
                this.isLoading = false;
                this.ratiosInfos = ratiosDetailedInfos
            });
        })
    }
}