import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetImageService {

  constructor(private http: HttpClient) { }

  getImageFile(assetId: string){
    this.http.get(`http://localhost:3000/api/ratio-analysis/${assetId}`);
  }

  saveImageFile(imageFile: File, assetId: string){
    this.http.post(`http://localhost:3000/api/ratio-analysis/${assetId}`, imageFile)
  }
}
