import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Spotify } from './spotify';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()

export class VideosService {
"https://api.spotify.com/v1/search?q=praise%20to%20the%20lord&type=track%2Cartist&market=US&limit=25&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H"
  oAuthToken = 'Authorization: Bearer BQCD2T-Z1I4DfszXsCh6eqPsMP1RaExMaQlIUodAdL3bkXz32V3l5F1peD1DMVs6LJyXWOGDeAYLk0Z8A1WHrDlTLp4Lom_N_eyJFCS0u99mA5ZifFu9PGdyGv_ujsCXBNOvujU4FNnXZYEs63K1lPtjWOVXX3s';
  videosUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key='+this.apiKey;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  /** GET heroes from the server */
  getVideos (term: string): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl+'&q='+term)
      .pipe(
        catchError(this.handleError('getVideos', []))
      );
  }

 /* GET videos whose name contains search term */
  searchVideos(term: string): Observable<Video[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ?
     { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Video[]>(this.videosUrl, options)
      .pipe(
        catchError(this.handleError<Video[]>('searchVideos', []))
      );
  }
}
