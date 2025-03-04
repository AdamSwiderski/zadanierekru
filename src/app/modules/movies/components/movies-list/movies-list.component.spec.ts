import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MoviesListStateService } from '../../services/movies-list-state.service';
import { MoviesListApiService } from '../../services/movies-list-api.service';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let moviesListStateServiceMock: jasmine.SpyObj<MoviesListStateService>;

  beforeEach(async () => {
    moviesListStateServiceMock = jasmine.createSpyObj('MoviesListStateService', [], {moviesList: signal([
        { Title: 'Movie A', Year: 2020, Genre: 'Action', Director: 'Director A', Poster: '', Plot: '', Runtime: '120' },
        { Title: 'Movie B', Year: 2021, Genre: 'Drama', Director: 'Director B', Poster: '', Plot: '', Runtime: '130' },
      ])});

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatSortModule, DragDropModule, MoviesListComponent],
      providers: [
        { provide: moviesListStateServiceMock, useValue: moviesListStateServiceMock },
        MoviesListApiService,
        MoviesListStateService,
        provideHttpClient()
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    moviesListStateServiceMock = TestBed.inject(MoviesListStateService) as jasmine.SpyObj<MoviesListStateService>;
    component = fixture.componentInstance;
    component.moviesList.set([
      { Title: 'Movie A', Year: 2020, Genre: 'Action', Director: 'Director A', Poster: 'test', Plot: '', Runtime: '120' },
      { Title: 'Movie B', Year: 2021, Genre: 'Drama', Director: 'Director B', Poster: 'test', Plot: '', Runtime: '130' },
    ]);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort movies by title in ascending order', () => {
    const sort: Sort = { active: 'title', direction: 'asc' };

    component.sortData(sort);
    fixture.detectChanges();

    const sortedMovies = component.moviesList();
    expect(sortedMovies[0].Title).toBe('Movie A');
    expect(sortedMovies[1].Title).toBe('Movie B');
  });

  it('should sort movies by year in descending order', () => {
    const sort: Sort = { active: 'year', direction: 'desc' };
    component.sortData(sort);
    fixture.detectChanges();

    const sortedMovies = component.moviesList();
    expect(sortedMovies[0].Year).toBe(2021);
    expect(sortedMovies[1].Year).toBe(2020);
  });

  it('should change column order when item is dragged and dropped', () => {
    const initialOrder = [...component.displayedColumns];
    const event = {
      previousIndex: 0,
      currentIndex: 1,
    } as CdkDragDrop<string[]>;

    component.dropListDropped(event);
    fixture.detectChanges();

    expect(component.displayedColumns).not.toEqual(initialOrder);
    expect(component.displayedColumns[0]).toBe('title');
  });

  it('should compare two strings correctly', () => {
    const resultAsc = component['compare']('A', 'B', true);
    const resultDesc = component['compare']('A', 'B', false);

    expect(resultAsc).toBe(-1);
    expect(resultDesc).toBe(1);
  });
});
