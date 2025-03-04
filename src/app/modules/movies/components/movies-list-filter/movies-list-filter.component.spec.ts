import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListFilterComponent } from './movies-list-filter.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MoviesListStateService } from '../../services/movies-list-state.service';
import { FilterType } from '../../enums/filter-type.enum';

describe('MoviesListFilterComponent', () => {
  let component: MoviesListFilterComponent;
  let fixture: ComponentFixture<MoviesListFilterComponent>;
  let moviesListStateServiceMock: jasmine.SpyObj<MoviesListStateService>;

  beforeEach(async () => {
    moviesListStateServiceMock = jasmine.createSpyObj('MoviesListStateService', ['fetchMovies']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MoviesListFilterComponent],
      providers: [
        { provide: MoviesListStateService, useValue: moviesListStateServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.filterForm.controls['filter'] instanceof FormControl).toBe(true);
    expect(component.filterForm.controls['filter'].value).toBe('');
  });

  it('should call fetchMovies when the filter value changes and length > 3', () => {
    component.filterForm.controls['filter'].setValue('test');
    fixture.detectChanges();
    expect(moviesListStateServiceMock.fetchMovies).toHaveBeenCalledWith('test', FilterType.title);
  });

  it('should not call fetchMovies when the filter value length <= 3', () => {
    component.filterForm.controls['filter'].setValue('te');
    fixture.detectChanges();
    expect(moviesListStateServiceMock.fetchMovies).not.toHaveBeenCalled();
  });

  it('should call fetchMovies with FilterType.year when the filter value is a number', () => {
    component.filterForm.controls['filter'].setValue('2020');
    fixture.detectChanges();
    expect(moviesListStateServiceMock.fetchMovies).toHaveBeenCalledWith('2020', FilterType.year);
  });

  it('should call fetchMovies with FilterType.title when the filter value is not a number', () => {
    component.filterForm.controls['filter'].setValue('movie');
    fixture.detectChanges();
    expect(moviesListStateServiceMock.fetchMovies).toHaveBeenCalledWith('movie', FilterType.title);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component['subs'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subs'].unsubscribe).toHaveBeenCalled();
  });

  it('should correctly identify year filter', () => {
    expect(component['isYearFilter']('2020')).toBe(true);
    expect(component['isYearFilter']('movie')).toBe(false);
  });
});
