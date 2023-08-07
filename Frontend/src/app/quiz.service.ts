import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private mediaTypeFormData = new BehaviorSubject<any>({
    tv: [],
    ova: [],
    movie: [],
    special: [],
    ona: [],
    music: [],
  });
  mediaTypeFormData$ = this.mediaTypeFormData.asObservable();
  setMediaTypeFormData(data: any): void {
    this.mediaTypeFormData.next(data);
  }
  getMediaTypeFormData(): any {
    return this.mediaTypeFormData.value;
  }

  private numEpFormData = new BehaviorSubject<any>({});
  numEpFormData$ = this.numEpFormData.asObservable();
  setNumEpFormData(data: any): void {
    this.numEpFormData.next(data);
  }
  getNumEpFormData(): any {
    return this.numEpFormData.value;
  }

  private epDurFormData = new BehaviorSubject<any>({});
  epDurFormData$ = this.epDurFormData.asObservable();
  setEpDurFormData(data: any): void {
    this.epDurFormData.next(data);
  }
  getEpDurFormData(): any {
    return this.epDurFormData.value;
  }




  getAllFormData(): any {
    //check if somthing is empty, if user skiped some step ilegaly
    return {
      mediaType: this.getMediaTypeFormData(),
      numEp: this.getNumEpFormData(),
      epDur: this.getEpDurFormData(),
      // Include other form data here
    };
  }

  deleteAllFormData(): void {
    this.mediaTypeFormData.next({
      tv: [],
      ova: [],
      movie: [],
      special: [],
      ona: [],
      music: [],
    });
    this.numEpFormData.next({});
    this.epDurFormData.next({});
    // Include other form data here
  }
}
