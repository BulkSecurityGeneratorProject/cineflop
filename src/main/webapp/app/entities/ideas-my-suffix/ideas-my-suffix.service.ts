import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IdeasMySuffix } from './ideas-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IdeasMySuffix>;

@Injectable()
export class IdeasMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/ideas';

    constructor(private http: HttpClient) { }

    create(ideas: IdeasMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ideas);
        return this.http.post<IdeasMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(ideas: IdeasMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(ideas);
        return this.http.put<IdeasMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IdeasMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IdeasMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<IdeasMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IdeasMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IdeasMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IdeasMySuffix[]>): HttpResponse<IdeasMySuffix[]> {
        const jsonResponse: IdeasMySuffix[] = res.body;
        const body: IdeasMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IdeasMySuffix.
     */
    private convertItemFromServer(ideas: IdeasMySuffix): IdeasMySuffix {
        const copy: IdeasMySuffix = Object.assign({}, ideas);
        return copy;
    }

    /**
     * Convert a IdeasMySuffix to a JSON which can be sent to the server.
     */
    private convert(ideas: IdeasMySuffix): IdeasMySuffix {
        const copy: IdeasMySuffix = Object.assign({}, ideas);
        return copy;
    }
}
