import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/api')) {
      return this.handleRequest(request, httpHandler);
    }

    return httpHandler.handle(request);
  }

  private handleRequest(
    request: HttpRequest<unknown>,
    httpHandler: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return httpHandler
      .handle(
        request.clone({
          url: `${request.url}`,
          setHeaders: this.getHeaders(),
        })
      )
      .pipe(
        catchError((error) =>
          request.headers.has('SkipError')
            ? throwError(() => error)
            : this.handleRequestError(error)
        )
      );
  }

  private handleRequestError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  private getHeaders(): { [header: string]: string } {
    return {
      Accept: 'application/json',
    };
  }
}
