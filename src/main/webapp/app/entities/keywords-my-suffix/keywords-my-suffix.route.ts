import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { KeywordsMySuffixComponent } from './keywords-my-suffix.component';
import { KeywordsMySuffixDetailComponent } from './keywords-my-suffix-detail.component';
import { KeywordsMySuffixPopupComponent } from './keywords-my-suffix-dialog.component';
import { KeywordsMySuffixDeletePopupComponent } from './keywords-my-suffix-delete-dialog.component';

export const keywordsRoute: Routes = [
    {
        path: 'keywords-my-suffix',
        component: KeywordsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'keywords-my-suffix/:id',
        component: KeywordsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keywordsPopupRoute: Routes = [
    {
        path: 'keywords-my-suffix-new',
        component: KeywordsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'keywords-my-suffix/:id/edit',
        component: KeywordsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'keywords-my-suffix/:id/delete',
        component: KeywordsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.keywords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
