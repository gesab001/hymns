import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Itunes } from './itunes';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

@Injectable()

export class ItunesService {
  private handleError: HandleError;
  itunesUrl = 'assets/itunes/tracks/';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ItunesService');
  }

  /** GET heroes from the server */
  getItunes (term: string): Observable<Itunes[]> {
    return this.http.get<Itunes[]>(this.itunesUrl+term)
      .pipe(
        catchError(this.handleError('getItunes', []))
      );
  }

}
