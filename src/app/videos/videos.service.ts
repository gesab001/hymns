import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Video } from './video';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()

export class VideosService {
  params = 'fields=items(id(videoId),snippet(title,description,thumbnails(default(url))))&part=snippet&maxResults=10&key=';
  apiKey = 'AIzaSyA6xZqvU8GsCuu_qKbnUZVv2ddxLdyiLpA';
  videosUrl = 'https://www.googleapis.com/youtube/v3/search?'+this.params+this.apiKey;
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
