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

  private genreFormData = new BehaviorSubject<any>({});
  genreFormData$ = this.genreFormData.asObservable();
  setGenreFormData(data: any): void {
    this.genreFormData.next(data);
  }
  getGenreFormData(): any {
    return this.genreFormData.value;
  }

  private statusFormData = new BehaviorSubject<any>({
    finished_airing: [],
    currently_airing: [],
    not_yet_aired: [],
  });
  statusFormData$ = this.statusFormData.asObservable();
  setStatusFormData(data: any): void {
    this.statusFormData.next(data);
  }
  getStatusFormData(): any {
    return this.statusFormData.value;
  }

  private relDateFormData = new BehaviorSubject<any>({});
  relDateFormData$ = this.relDateFormData.asObservable();
  setRelDateFormData(data: any): void {
    this.relDateFormData.next(data);
  }
  getRelDateFormData(): any {
    return this.relDateFormData.value;
  }

  private sourceFormData = new BehaviorSubject<any>({});
  sourceFormData$ = this.sourceFormData.asObservable();
  setSourceFormData(data: any): void {
    this.sourceFormData.next(data);
  }
  getSourceFormData(): any {
    return this.sourceFormData.value;
  }

  private studioFormData = new BehaviorSubject<any>({});
  studioFormData$ = this.studioFormData.asObservable();
  setStudioFormData(data: any): void {
    this.studioFormData.next(data);
  }
  getStudioFormData(): any {
    return this.studioFormData.value;
  }


  getAllFormData(): any {
    //check if somthing is empty, if user skiped some step ilegaly
    return {
      mediaType: this.getMediaTypeFormData(),
      numEp: this.getNumEpFormData(),
      epDur: this.getEpDurFormData(),
      genre: this.getGenreFormData(),
      status: this.getStatusFormData(),
      relDate: this.getRelDateFormData(),
      source: this.getSourceFormData(),
      studio: this.getStudioFormData(),
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
    this.genreFormData.next({});
    this.statusFormData.next({
      finished_airing: [],
      currently_airing: [],
      not_yet_aired: [],
    });
    this.relDateFormData.next({});
    this.sourceFormData.next({});
    this.studioFormData.next({});
    // Include other form data here
  }
}
