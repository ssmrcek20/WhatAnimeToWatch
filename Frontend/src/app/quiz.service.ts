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




  getAllFormData(): any {
    return {
      mediaType: this.getMediaTypeFormData(),
      numEp: this.getNumEpFormData(),
      // Include other form data here
    };
  }

  deleteAllFormData(): void {
    this.mediaTypeFormData.next({});
    this.numEpFormData.next({});
    // Include other form data here
  }
}
