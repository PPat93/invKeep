import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";


export const mimeValidator = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    const file = control.value as File;
    let fileReader = new FileReader();
    let fileReaderObserver = new Observable((observer: Observer<{ [key: string]: any }>) => {
        fileReader.addEventListener(`loadend`, () => {

        })
        fileReader.readAsArrayBuffer(file);
    })
}