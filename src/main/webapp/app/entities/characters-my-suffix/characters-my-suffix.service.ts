import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CharactersMySuffix } from './characters-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CharactersMySuffix>;

@Injectable()
export class CharactersMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/characters';

    constructor(private http: HttpClient) { }

    create(characters: CharactersMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(characters);
        return this.http.post<CharactersMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(characters: CharactersMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(characters);
        return this.http.put<CharactersMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CharactersMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CharactersMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CharactersMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CharactersMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CharactersMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CharactersMySuffix[]>): HttpResponse<CharactersMySuffix[]> {
        const jsonResponse: CharactersMySuffix[] = res.body;
        const body: CharactersMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CharactersMySuffix.
     */
    private convertItemFromServer(characters: CharactersMySuffix): CharactersMySuffix {
        const copy: CharactersMySuffix = Object.assign({}, characters);
        return copy;
    }

    /**
     * Convert a CharactersMySuffix to a JSON which can be sent to the server.
     */
    private convert(characters: CharactersMySuffix): CharactersMySuffix {
        const copy: CharactersMySuffix = Object.assign({}, characters);
        return copy;
    }
}
