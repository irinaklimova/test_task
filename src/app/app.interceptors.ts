import { Injectable } from '@angular/core';
import {HttpHandler, HttpRequest, HttpEvent, HttpInterceptor} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppInterceptors implements HttpInterceptor {

    constructor(
    ) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'text/plain; charset=utf-8'
                }
            });
        }

        return next.handle(request);
    }
}
