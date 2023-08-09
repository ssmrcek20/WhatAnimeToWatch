import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from './interfaces/Genre';
import { Studio } from './interfaces/Studio';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private genres: Genre[] = [];
  private studios: Studio[] = [];

  constructor(private http: HttpClient) { }

  async getGenres(): Promise<Genre[]> {
    if (this.genres.length > 0) {
      return this.genres;
    } else {
      try {
        const data = await lastValueFrom(this.http.get<Genre[]>(environment.backendUrl + '/api/Genres'));
        this.genres = data;
        return this.genres;
      } catch (error) {
        throw error;
      }
    }
  }

  async getStudios(): Promise<Genre[]> {
    if (this.studios.length > 0) {
      return this.studios;
    } else {
      try {
        const data = await lastValueFrom(this.http.get<Studio[]>(environment.backendUrl + '/api/Studios'));
        this.studios = data;
        return this.studios;
      } catch (error) {
        throw error;
      }
    }
  }
}
