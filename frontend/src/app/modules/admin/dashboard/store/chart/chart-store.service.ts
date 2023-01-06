import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChartStoreService {

    constructor(private http: HttpClient) { }

    getSalesChart(year: any): Observable<any> {
        const chartUrl = `/api/action/get_chart/${year}`;
        return this.http.get<any>(environment.backend_url + chartUrl);
    }

    getTargetChart(branchId: any): Observable<any> {
        const targetChartUrl = `/api/action/get_target/${branchId}`;
        return this.http.get<any>(environment.backend_url + targetChartUrl);
    }

    updateTargetChart(payload: any): Observable<any> {
        const targetChartUrl = `/api/action/update_target`;
        return this.http.post<any>(environment.backend_url + targetChartUrl, payload);
    }

}
