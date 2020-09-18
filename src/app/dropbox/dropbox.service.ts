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
  url = 'https://content.dropboxapi.com/2/files/upload';
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


  updateHistory(hymn: number) {
  this.clearCache();
  // let headers = new HttpHeaders();
  // headers.set('Authorization', 'Bearer cB31ZlekiIYAAAAAAAAAAQlcDFV299-KvVJuEVFPlnowkL2vZMEcNCWSeYMmKmwk');
  // headers.append('Dropbox-API-Arg', '{\"path\": \"/history.json\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false,\"strict_conflict\": false}');
  // headers.append('Content-Type', 'application/json');

    let newitem = {'angular': hymn};
    if (!this._data) {
      this._data = this.http
        .post(this.url, newitem, {headers: {
            "Authorization": "Bearer cB31ZlekiIYAAAAAAAAAAQlcDFV299-KvVJuEVFPlnowkL2vZMEcNCWSeYMmKmwk",
            "Dropbox-API-Arg": "{\"path\": \"/history.json\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false,\"strict_conflict\": false}",
            "Content-Type": "application/octet-stream"
         }})
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }
}
