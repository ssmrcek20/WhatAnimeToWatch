import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private mediaTypeFormData = new BehaviorSubject<any>({});
  mediaTypeFormData$ = this.mediaTypeFormData.asObservable();

  setMediaTypeFormData(data: any): void {
    this.mediaTypeFormData.next(data);
    console.log(this.mediaTypeFormData.value);
  }
  getMediaTypeFormData(): any {
    return this.mediaTypeFormData.value;
  }

  // Implement similar methods for other steps

  getAllFormData(): any {
    return {
      mediaType: this.getMediaTypeFormData(),
      // Include other form data here
    };
  }
}
