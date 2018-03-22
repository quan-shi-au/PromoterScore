import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { SpinnerService } from './spinner.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var newUrl = this.getNewUrl(req);

        const authReq = req.clone({
            url: newUrl
        });

        setTimeout(() => { this.spinnerService.markLoading(); }, 0)
        return next.handle(authReq).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse)
                setTimeout(() => { this.spinnerService.markFinishedLoading(); }, 0)
        }, (err: any) => {
                setTimeout(() => { this.spinnerService.markFinishedLoading(); }, 0)
            }
        );
    }

    getNewUrl(req) : string {
        var newUrl;
        if (req.url.indexOf('token') >= 0) {
            newUrl = req.url
        }
        else if (req.url.indexOf('?') >= 0) {
            newUrl = req.url + "&datetime=" + new Date().getTime();
        }
        else {
            newUrl = req.url + "?datetime=" + new Date().getTime();
        }

        return newUrl;
    }
}
