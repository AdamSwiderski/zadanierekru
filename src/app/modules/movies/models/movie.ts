export interface Movie {
  Title: string;
  Poster: string;
  Year: number;
  Runtime: string;
  Genre: string;
  Director: string;
  Plot: string;
}

export interface MoviesResponse {
  Search: Movie[]
}
