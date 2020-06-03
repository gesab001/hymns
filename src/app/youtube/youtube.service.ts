import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Youtube } from './youtube';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()

export class YoutubeService {
  private handleError: HandleError;
  youtubeUrl = 'assets/youtube/tracks/';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('YoutubeService');
  }

  /** GET heroes from the server */
  getYoutube (term: string): Observable<Youtube[]> {
    return this.http.get<Youtube[]>(this.youtubeUrl+term)
      .pipe(
        catchError(this.handleError('getYoutube', []))
      );
  }

}
