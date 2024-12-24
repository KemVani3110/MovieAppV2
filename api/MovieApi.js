const apikey = '2154b6ce8b8a1d04a31ad1c781bb44cf';

export const baseImagePath = (size, path) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;

export const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;

export const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;

export const searchMovies = (keyword) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};

export const movieDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};

export const movieCastDetails = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};

export const similarMovies = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apikey}`;
};

export const personDetails = (id) => {
  return `https://api.themoviedb.org/3/person/${id}?api_key=${apikey}`;
};

export const personMovies = (id) => {
  return `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apikey}`;
};

export const image500 = (posterpath) =>
  posterpath ? "https://image.tmdb.org/t/p/w500" + posterpath : null;


