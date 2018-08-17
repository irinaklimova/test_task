import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    get(url) {
        return this.http.get(url,  {})
            .toPromise()
            .then(this.handleSuccess)
            .catch(this.handleError);
    }

    private handleSuccess(res: any): Promise<any> {
        return Promise.resolve(res);
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err);
    }
}
