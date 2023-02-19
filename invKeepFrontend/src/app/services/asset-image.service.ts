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

  //  analysis image retrieval, it is called when entered details page, handles 404 and returns message + imagPath containing a direct path 
  //  to the server side loaded image
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

  // TODO - 2 - good to have - analysis image file delete + layout + backend and database handling

  getImageFileUpdateListener(): Observable<{ message: string, imgPath?: string }> {
    return this.analysisImageSave.asObservable();
  }

  getImageFileGetListener(): Observable<{ message: string, imgPath?: string }> {
    return this.analysisImageGet.asObservable();
  }
}
