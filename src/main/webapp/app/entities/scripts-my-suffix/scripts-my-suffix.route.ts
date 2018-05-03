import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ScriptsMySuffixComponent } from './scripts-my-suffix.component';
import { ScriptsMySuffixDetailComponent } from './scripts-my-suffix-detail.component';
import { ScriptsMySuffixPopupComponent } from './scripts-my-suffix-dialog.component';
import { ScriptsMySuffixDeletePopupComponent } from './scripts-my-suffix-delete-dialog.component';

export const scriptsRoute: Routes = [
    {
        path: 'scripts-my-suffix',
        component: ScriptsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scripts-my-suffix/:id',
        component: ScriptsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scriptsPopupRoute: Routes = [
    {
        path: 'scripts-my-suffix-new',
        component: ScriptsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scripts-my-suffix/:id/edit',
        component: ScriptsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scripts-my-suffix/:id/delete',
        component: ScriptsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.scripts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
