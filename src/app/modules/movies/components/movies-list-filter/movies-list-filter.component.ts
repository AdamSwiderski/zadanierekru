import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MoviesListStateService } from '../../services/movies-list-state.service';
import { FilterType } from '../../enums/filter-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-list-filter',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel
  ],
  templateUrl: './movies-list-filter.component.html',
  styleUrl: './movies-list-filter.component.scss'
})
export class MoviesListFilterComponent implements OnInit, OnDestroy {
  readonly filterForm = new FormGroup({
    filter: new FormControl<string>(''),
  });

  moviesListStateService: MoviesListStateService = inject(MoviesListStateService);

  private subs: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.subs.add(this.filterForm.controls.filter.valueChanges.subscribe(value => {
      if (value && value.length > 3) {
        this.moviesListStateService.fetchMovies(value, this.isYearFilter(value) ? FilterType.year : FilterType.title);
      }
    }));
  }

  private isYearFilter(filterValue: string | null): boolean {
    const regexp = new RegExp('^\\d*$');
    if (filterValue === null) {
      return false;
    }
    return regexp.test(filterValue);
  }
}
