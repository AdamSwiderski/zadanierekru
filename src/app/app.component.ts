import { Component } from '@angular/core';
import { MoviesListStateService } from './modules/movies/services/movies-list-state.service';
import { MoviesListApiService } from './modules/movies/services/movies-list-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MoviesListApiService, MoviesListStateService],
  standalone: false
})
export class AppComponent {
  title = 'zadanierekru';
}
