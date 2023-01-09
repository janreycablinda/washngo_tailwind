import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryStoreService {

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    const categoryUrl = '/api/action/get_category';
    return this.http.get<any>(environment.backend_url + categoryUrl);
  }
}
