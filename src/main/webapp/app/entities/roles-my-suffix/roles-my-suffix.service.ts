import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RolesMySuffix } from './roles-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RolesMySuffix>;

@Injectable()
export class RolesMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/roles';

    constructor(private http: HttpClient) { }

    create(roles: RolesMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(roles);
        return this.http.post<RolesMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(roles: RolesMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(roles);
        return this.http.put<RolesMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RolesMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RolesMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<RolesMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RolesMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RolesMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RolesMySuffix[]>): HttpResponse<RolesMySuffix[]> {
        const jsonResponse: RolesMySuffix[] = res.body;
        const body: RolesMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RolesMySuffix.
     */
    private convertItemFromServer(roles: RolesMySuffix): RolesMySuffix {
        const copy: RolesMySuffix = Object.assign({}, roles);
        return copy;
    }

    /**
     * Convert a RolesMySuffix to a JSON which can be sent to the server.
     */
    private convert(roles: RolesMySuffix): RolesMySuffix {
        const copy: RolesMySuffix = Object.assign({}, roles);
        return copy;
    }
}
