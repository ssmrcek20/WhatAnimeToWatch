import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from './interfaces/Genre';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private genres: Genre[] = [];

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
}
