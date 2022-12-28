import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetImageService {

  constructor(private http: HttpClient) { }

  getImageFile(assetId: string, imagePath: string) {
    this.http.get(`http://localhost:3000/api/ratio-analysis/${assetId}/images/${imagePath}`);
  }

  saveImageFile(imageFile: File, assetId: string) {
    this.http.post(`http://localhost:3000/api/ratio-analysis/${assetId}/images`, imageFile)
      .subscribe(responseData => {
        console.log('sent');
        console.log(responseData);
      })
    return 1;
  }
}
