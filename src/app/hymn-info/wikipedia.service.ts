import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Wikipedia } from './wikipedia';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()

export class WikipediaService {

  private handleError: HandleError;
  url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&utf8=1&srsearch=';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('WikipediaService');
  }

  /** GET heroes from the server */
  getWikipedia (term: string): Observable<Wikipedia[]> {
    return this.http.get<Wikipedia[]>(this.url+term)
      .pipe(
        catchError(this.handleError('getWikipedia', []))
      );
  }
}
