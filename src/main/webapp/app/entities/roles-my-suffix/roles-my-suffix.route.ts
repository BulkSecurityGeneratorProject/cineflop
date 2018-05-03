import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RolesMySuffixComponent } from './roles-my-suffix.component';
import { RolesMySuffixDetailComponent } from './roles-my-suffix-detail.component';
import { RolesMySuffixPopupComponent } from './roles-my-suffix-dialog.component';
import { RolesMySuffixDeletePopupComponent } from './roles-my-suffix-delete-dialog.component';

export const rolesRoute: Routes = [
    {
        path: 'roles-my-suffix',
        component: RolesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.roles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'roles-my-suffix/:id',
        component: RolesMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.roles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolesPopupRoute: Routes = [
    {
        path: 'roles-my-suffix-new',
        component: RolesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.roles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'roles-my-suffix/:id/edit',
        component: RolesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.roles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'roles-my-suffix/:id/delete',
        component: RolesMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.roles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
