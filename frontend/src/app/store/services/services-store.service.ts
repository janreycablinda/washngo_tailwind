import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesStoreService {

  constructor(private http: HttpClient) { }

  getAllServices(): Observable<any> {
    const categoryUrl = '/api/action/get_services';
    return this.http.get<any>(environment.backend_url + categoryUrl);
  }

  getServices(payload): Observable<any> {
    const categoryUrl = '/api/action/find_services';
    return this.http.post<any>(environment.backend_url + categoryUrl, payload);
  }
}
