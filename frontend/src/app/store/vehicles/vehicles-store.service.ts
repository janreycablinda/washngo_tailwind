import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesStoreService {

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<any> {
    const vehicleUrl = '/api/action/get_vehicle';
    return this.http.get<any>(environment.backend_url + vehicleUrl);
  }
}
