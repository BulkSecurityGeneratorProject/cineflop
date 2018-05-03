import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { KeywordsMySuffix } from './keywords-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<KeywordsMySuffix>;

@Injectable()
export class KeywordsMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/keywords';

    constructor(private http: HttpClient) { }

    create(keywords: KeywordsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(keywords);
        return this.http.post<KeywordsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(keywords: KeywordsMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(keywords);
        return this.http.put<KeywordsMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<KeywordsMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<KeywordsMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<KeywordsMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<KeywordsMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: KeywordsMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<KeywordsMySuffix[]>): HttpResponse<KeywordsMySuffix[]> {
        const jsonResponse: KeywordsMySuffix[] = res.body;
        const body: KeywordsMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to KeywordsMySuffix.
     */
    private convertItemFromServer(keywords: KeywordsMySuffix): KeywordsMySuffix {
        const copy: KeywordsMySuffix = Object.assign({}, keywords);
        return copy;
    }

    /**
     * Convert a KeywordsMySuffix to a JSON which can be sent to the server.
     */
    private convert(keywords: KeywordsMySuffix): KeywordsMySuffix {
        const copy: KeywordsMySuffix = Object.assign({}, keywords);
        return copy;
    }
}
