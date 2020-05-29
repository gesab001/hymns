import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Video } from './video';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()

export class VideosService {
  apiKey = 'AIzaSyD4QOn3JQLzdnM-N8Z6Ig6aoS0PaXjfB-8';
  videosUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=AIzaSyD4QOn3JQLzdnM-N8Z6Ig6aoS0PaXjfB-8';
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
