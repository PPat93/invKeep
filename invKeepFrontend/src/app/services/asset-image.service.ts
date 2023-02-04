import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createFileFormData } from "../shared/sharedTS";

@Injectable({
  providedIn: 'root'
})
export class AssetImageService {

  constructor(private http: HttpClient) { }

  getImageFile(assetId: string, imagePath: string) {
    this.http.get(`http://localhost:3000/api/ratio-analysis/${assetId}/images/${imagePath}`);
  }

  saveImageFile(imageFile: File, assetId: string) {
    
    let formData = new FormData();
    formData = createFileFormData(imageFile);

    this.http.post<{ message: string }>(`http://localhost:3000/api/ratio-analysis/${assetId}/images`, formData)
      .subscribe(responseData => {
        // placeholder for response handling
      })
    return 1;
  }
}
