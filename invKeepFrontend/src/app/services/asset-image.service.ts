import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createFileFormData } from "../shared/sharedTS";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetImageService {

  analysisImageSave = new Subject<string>();

  constructor(private http: HttpClient) { }

  getImageFile(assetId: string, imagePath: string) {
    this.http.get(`http://localhost:3000/api/ratio-analysis/${assetId}/images/${imagePath}`);
  }

  saveImageFile(imageFile: File, assetId: string) {

    let formData = new FormData();
    formData = createFileFormData(imageFile);

    this.http.post<{ message: string, imgPath: string }>(`http://localhost:3000/api/ratio-analysis/${assetId}/images`, formData)
      .subscribe(responseData => {
        this.analysisImageSave.next(responseData.imgPath);
      })
    return this.analysisImageSave;
  }
}
