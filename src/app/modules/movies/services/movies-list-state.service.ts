import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesListApiService } from './movies-list-api.service';
import { FilterType } from '../enums/filter-type.enum';
import { tap } from 'rxjs';

@Injectable()
export class MoviesListStateService {
  loading: WritableSignal<boolean> = signal<boolean>(false);
  moviesList: WritableSignal<Movie[]> = signal<Movie[]>([]);
  readonly moviesListApiService: MoviesListApiService = inject(MoviesListApiService);

  fetchMovies(filter: string, filterType: FilterType): void {
    this.loading.set(true);
    this.moviesListApiService.getMoviesList(filter, filterType)
      .pipe(tap(() => this.loading.set(false)))
      .subscribe(movies => {
      this.moviesList.set(movies.Search);
    });
  }
}
