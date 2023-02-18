import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createFileFormData } from "../shared/sharedTS";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetImageService {

  analysisImageSave = new Subject<{ message: string, imgPath?: string }>();
  analysisImageGet = new Subject<{ message: string, imgPath?: string }>();

  constructor(private http: HttpClient) { }

  getImageFile(assetId: string) {
    this.http.get<{ message: string, imgPath: string }>(`http://localhost:3000/api/ratio-analysis/${assetId}/images`)
      .subscribe(receivedPath => {
        this.analysisImageGet.next(receivedPath);
      }, 
      //  handling case of 404 not found if no image was previously saved or if it was removed. In that case, only object from BE is passed
      err => {
        if (err.status === 404)
          return this.analysisImageGet.next(err.error);
      });
    return this.analysisImageGet;
  }

  saveImageFile(imageFile: File, assetId: string) {

    let formData = new FormData();
    formData = createFileFormData(imageFile);

    this.http.post<{ message: string, imgPath?: string }>(`http://localhost:3000/api/ratio-analysis/${assetId}/images`, formData)
      .subscribe(responseData => {

        this.analysisImageSave.next(responseData);
      })
    return this.analysisImageSave;
  }

  getImageFileUpdateListener(): Observable<{ message: string, imgPath?: string }> {
    return this.analysisImageSave.asObservable();
  }

  getImageFileGetListener(): Observable<{ message: string, imgPath?: string }> {
    return this.analysisImageGet.asObservable();
  }
}
