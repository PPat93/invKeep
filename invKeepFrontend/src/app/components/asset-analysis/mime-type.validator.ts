import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

/*  ->  Asynchronous MIME type validator of uploaded analysis file 
*   ->  Validator that checks real MIME type of uploaded file. No matter what extension was, it is digging inside
*       the array buffer that was uploaded and extracts exact values from the file. After file loading is completed
*       new Uint8Array is created out of the file reader results, then it is iterated and a file type code is extracted.
*       Finally, switch case decides which codes are correct and which are not.
*   ->  Whole valdator is a function that gets a FormControl (of a type AbstractControl - base class for FormControl) of 
*       a FormGroup as an argument and returns null when everything is correct and object containing error property and
*       error message if the type is wrong.
*/
export const mimeValidator = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {

    const file = control.value as File;
    let fileReader = new FileReader();

    let fileReaderObserver = new Observable((observer: Observer<{ [key: string]: any }>) => {

        fileReader.addEventListener(`loadend`, () => {

            let fileReaderResultSubArray = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
            let typeCode = ``;

            fileReaderResultSubArray.forEach(singleItem => typeCode += singleItem.toString(16))

            switch (typeCode) {
                // case 
                default:
                    return false;
            }
        })
        fileReader.readAsArrayBuffer(file);
    })
}