import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })

export class RatioDetailsService implements OnInit {

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {

    }

    getRatiosDetails(ratioName) {

    }
}