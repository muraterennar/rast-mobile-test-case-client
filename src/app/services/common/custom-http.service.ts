import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  /**
   * URL'yi oluşturur. Eğer baseUrl veya controller ve action belirtilmişse, bunları kullanarak URL oluşturur.
   * @param requestParameter URL yapılandırma parametreleri
   * @returns Tam URL
   */
  private buildUrl(requestParameter: Partial<RequestParameters>): string {
    const base = requestParameter.baseUrl || this.apiUrl;
    const controller = requestParameter.controller || '';
    const action = requestParameter.action ? `/${requestParameter.action}` : '';
    return `${base}/${controller}${action}`;
  }

  /**
   * HTTP isteğini gönderir ve hataları yakalar.
   * @param request$ HTTP isteği
   * @returns İsteğin Observable yanııtı
   */
  private handleRequest<T>(request$: Observable<T>): Observable<T> {
    return request$.pipe(
      catchError((error) => {
        // Hata yönetim işlemleri burada yapılır
        console.error('Request failed', error);
        return throwError(() => new Error('Request failed'));
      })
    );
  }

  /**
   * GET isteği gönderir.
   * @param requestParameter İsteğin yapılandırma parametreleri
   * @param id İsteğe bağlı ID
   * @returns GET isteğinin Observable yanııtı
   */
  get<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    const url =
      requestParameter.fullEndPoint ||
      `${this.buildUrl(requestParameter)}${id ? `/${id}` : ''}`;
    const options = this.createHttpOptions(requestParameter);

    return this.handleRequest(this.httpClient.get<T>(url, options));
  }

  /**
   * POST isteği gönderir.
   * @param requestParameter İsteğin yapılandırma parametreleri
   * @param body Gönderilecek veri
   * @returns POST isteğinin Observable yanııtı
   */
  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    const url =
      requestParameter.fullEndPoint || `${this.buildUrl(requestParameter)}`;
    const options = this.createHttpOptions(requestParameter);

    return this.handleRequest(this.httpClient.post<T>(url, body, options));
  }

  /**
   * POST isteği gönderir ve yanıt tipi belirler.
   * @param requestParameter İsteğin yapılandırma parametreleri
   * @param body Gönderilecek veri
   * @returns POST isteğinin Observable yanııtı
   */
  postAuth<T, X>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<X> {
    const url =
      requestParameter.fullEndPoint || `${this.buildUrl(requestParameter)}`;
    const options = this.createHttpOptions(requestParameter);

    return this.handleRequest(this.httpClient.post<X>(url, body, options));
  }

  /**
   * PUT isteği gönderir.
   * @param requestParameter İsteğin yapılandırma parametreleri
   * @param body Gönderilecek veri
   * @returns PUT isteğinin Observable yanııtı
   */
  put<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    const url =
      requestParameter.fullEndPoint || `${this.buildUrl(requestParameter)}`;
    const options = this.createHttpOptions(requestParameter);

    return this.handleRequest(this.httpClient.put<T>(url, body, options));
  }

  /**
   * DELETE isteği gönderir.
   * @param requestParameter İsteğin yapılandırma parametreleri
   * @param id Silinecek öğenin ID'si
   * @returns DELETE isteğinin Observable yanııtı
   */
  delete<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    const url =
      requestParameter.fullEndPoint ||
      `${this.buildUrl(requestParameter)}${id ? `/${id}` : ''}`;
    const options = this.createHttpOptions(requestParameter);

    return this.handleRequest(this.httpClient.delete<T>(url, options));
  }

  /**
   * HTTP istekleri için ayarları oluşturur.
   * @param requestParameter İsteğin yapılandırma parametreleri
   * @returns HTTP istek ayarları
   */
  private createHttpOptions(requestParameter: Partial<RequestParameters>) {
    const headers = requestParameter.headers || new HttpHeaders();
    const responseType = requestParameter.responseType || 'json';
    return {
      headers,
      responseType: responseType as 'json',
      params: requestParameter.queryString
        ? new HttpParams({ fromString: requestParameter.queryString })
        : undefined,
    };
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;

  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;

  responseType?: string = 'json';
}
