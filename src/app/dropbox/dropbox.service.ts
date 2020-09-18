import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DropboxService {
  _data: any = null;
  private handleError: HandleError;

  params = new HttpParams()
  .set('path', '/history.json')
  .set('mode', 'add')
  .set('autorename', 'true')
  .set('mute', 'false')
  .set('strict_conflict', 'false');
  
  constructor(
    private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DropboxService');
  }

  clearCache() {
    this._data = null;
  }

  getHistory(){
    this.clearCache();
    let url = 'https://content.dropboxapi.com/2/files/download';
    if (!this._data) {
      this._data = this.http
        .post(url, {headers: {
            "Authorization": "Bearer " + this.token,
            "Dropbox-API-Arg": "{\"path\": \"/history.json\"}"
         }})
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }
  
  updateHistory(hymn: string) {
    let url = 'https://content.dropboxapi.com/2/files/upload';
    this.clearCache();
    let newitem = {'angular': hymn};
    if (!this._data) {
      this._data = this.http
        .post(url, newitem, {headers: {
            "Authorization": "Bearer " + this.token,
            "Dropbox-API-Arg": "{\"path\": \"/history.json\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false,\"strict_conflict\": false}",
            "Content-Type": "application/octet-stream"
         }})
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }
}
