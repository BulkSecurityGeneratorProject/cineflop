import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IdeasMySuffixComponent } from './ideas-my-suffix.component';
import { IdeasMySuffixDetailComponent } from './ideas-my-suffix-detail.component';
import { IdeasMySuffixPopupComponent } from './ideas-my-suffix-dialog.component';
import { IdeasMySuffixDeletePopupComponent } from './ideas-my-suffix-delete-dialog.component';

export const ideasRoute: Routes = [
    {
        path: 'ideas-my-suffix',
        component: IdeasMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.ideas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ideas-my-suffix/:id',
        component: IdeasMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.ideas.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ideasPopupRoute: Routes = [
    {
        path: 'ideas-my-suffix-new',
        component: IdeasMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.ideas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ideas-my-suffix/:id/edit',
        component: IdeasMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.ideas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ideas-my-suffix/:id/delete',
        component: IdeasMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.ideas.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
