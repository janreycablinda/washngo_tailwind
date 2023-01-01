import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChartStoreService {

    constructor(private http: HttpClient) { }

    getChart(year: any): Observable<any> {
        const chartUrl = `/api/action/get_chart/${year}`;
        return this.http.get<any>(environment.backend_url + chartUrl);
    }
}
