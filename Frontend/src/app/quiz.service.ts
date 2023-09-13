import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cloneDeep } from 'lodash';
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

  private ageRFormData = new BehaviorSubject<any>({
    g: [],
    pg: [],
    pg13: [],
    r: [],
    rPlus: []
  });
  ageRFormData$ = this.ageRFormData.asObservable();
  setAgeRFormData(data: any): void {
    this.ageRFormData.next(data);
  }
  getAgeRFormData(): any {
    return this.ageRFormData.value;
  }


  getAllFormData(): any {
    const date = cloneDeep(this.getRelDateFormData());
    if(date.years != null && date.years.length > 1 && date.years[0] != null && date.years[1] != null) {
      date.years[0] = date.years[0].getTime() - date.years[0].getTimezoneOffset() * 60000;
      date.years[1] = date.years[1].getTime() - date.years[1].getTimezoneOffset() * 60000;
    }
    else if(date.years != null && date.years[1] == null){
      date.years.splice(1, 1);
      date.years[0] = date.years[0].getTime() - date.years[0].getTimezoneOffset() * 60000;
    }
    //check if somthing is empty, if user skiped some step ilegaly
    return {
      mediaType: this.getMediaTypeFormData(),
      numEp: this.getNumEpFormData(),
      epDur: this.getEpDurFormData(),
      genre: this.getGenreFormData(),
      status: this.getStatusFormData(),
      relDate: date,
      source: this.getSourceFormData(),
      studio: this.getStudioFormData(),
      ageR: this.getAgeRFormData(),
    };
  }

  deleteAllFormData(): void {
    this.mediaTypeFormData.next({
      tv: [],
      ova: [],
      movie: [],
      special: [],
      ona: [],
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
    this.ageRFormData.next({
      g: [],
      pg: [],
      pg13: [],
      r: [],
      rPlus: []
    });
  }
}
