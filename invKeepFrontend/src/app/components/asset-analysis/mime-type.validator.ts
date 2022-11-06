import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

/*  ->  Asynchronous MIME type validator of uploaded analysis file 
*   ->  Validator that checks real MIME type of uploaded file. No matter what extension was, it is digging inside
*       the array buffer that was uploaded and extracts exact values from the file. After file loading is completed
*       new Uint8Array is created out of the file reader results, then it is iterated and a magic file number is extracted.
*       Finally, switch case decides which numbers are correct and which are not.
*   ->  Whole valdator is a function that gets a FormControl (of a type AbstractControl - base class for FormControl) of 
*       a FormGroup as an argument and returns null when everything is correct and object containing error property and
*       error message if the type is wrong.
*/
export const mimeValidator = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {

    //  Variable holding validation result
    let isFileImage = false;

    const file = control.value as File;
    let fileReader = new FileReader();

    let fileReaderObserver = new Observable((observer: Observer<{ [key: string]: any }>) => {

        fileReader.addEventListener(`loadend`, () => {

            //  First 4 values of an array created out of read uploaded file
            let fileReaderResultSubArray = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);

            //  File magic number unique for the file type
            let fileMagicNumber = ``;

            //  Extraction, conversion of each magic number part from hex. Building magic number string
            fileReaderResultSubArray.forEach(singleItem => fileMagicNumber += singleItem.toString(16))

            //  All allowed magic numbers
            const allowiedMagicNumbers = [
                `89504E47`, // png file type
                `FFD8FFE0`, `FFD8FFE1`, `FFD8FFE2`, `FFD8FFE3`, `FFD8FFE08` // all jpgs file types
            ];

            //  Check if extracted file magic number is allowed 
            if (allowiedMagicNumbers.includes(fileMagicNumber))
                isFileImage = true;
            else
                isFileImage = false;

            //  Return validation result - null is corrrect and object is error    
            if (isFileImage)
                observer.next(null);
            else
                observer.next({ invalidMimeType: true });

            //  Finish observer's job    
            observer.complete();
        })
        fileReader.readAsArrayBuffer(file);
    })
    return fileReaderObserver;
}