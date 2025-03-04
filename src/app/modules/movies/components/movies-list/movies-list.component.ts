import { Component, inject, WritableSignal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MoviesListStateService } from '../../services/movies-list-state.service';
import { Movie } from '../../models/movie';
import { MoviesListApiService } from '../../services/movies-list-api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  imports: [
    MatTableModule, MatSortModule, MatProgressSpinner, DragDropModule, NgOptimizedImage
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  providers: [MoviesListApiService, MoviesListApiService],
})
export class MoviesListComponent {
  moviesList: WritableSignal<Movie[]> = inject(MoviesListStateService).moviesList;

  readonly displayedColumns: string[] = ['poster', 'title', 'year', 'runtime', 'genre', 'director', 'plot'];
  readonly moviesListStateService: MoviesListStateService = inject(MoviesListStateService);

  dropListDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  sortData(sort: Sort) {
    const data = this.moviesList().slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.moviesList.set(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'poster':
          return this.compare(a.Poster, b.Poster, isAsc);
        case 'title':
          return this.compare(a.Title, b.Title, isAsc);
        case 'plot':
          return this.compare(a.Plot, b.Plot, isAsc);
        case 'genre':
          return this.compare(a.Genre, b.Genre, isAsc);
        case 'year':
          return this.compare(a.Year, b.Year, isAsc);
        case 'director':
          return this.compare(a.Director, b.Director, isAsc);
        case 'runtime':
          return this.compare(a.Runtime, b.Runtime, isAsc);
        default:
          return 0;
      }
    }))
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
