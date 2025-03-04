import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesResponse } from '../models/movie';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterType } from '../enums/filter-type.enum';

@Injectable({
  providedIn: 'root',
})
export class MoviesListApiService {
  readonly http: HttpClient = inject(HttpClient);

  getMoviesList(filter: string, filterType: FilterType, page: number = 1): Observable<MoviesResponse> {
    const standardParams = { page, type: 'movie', plot: 'full' }
    const paramsWithYearFilter = new HttpParams({fromObject: { y: filter, ...standardParams }});
    const paramsWithTitleFilter = new HttpParams({fromObject: { s: filter, ...standardParams }});
    return this.http.get<MoviesResponse>('http://omdbapi.com/?apikey=82132b45',
      { params: filterType === FilterType.title ? paramsWithTitleFilter : paramsWithYearFilter});
  }
}
