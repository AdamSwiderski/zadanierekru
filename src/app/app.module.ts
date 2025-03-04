import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClient } from '@angular/common/http';
import { MoviesListComponent } from './modules/movies/components/movies-list/movies-list.component';
import { MoviesListFilterComponent } from './modules/movies/components/movies-list-filter/movies-list-filter.component';


@NgModule({
declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    MoviesListComponent,
    MoviesListFilterComponent,
    MatCardModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
