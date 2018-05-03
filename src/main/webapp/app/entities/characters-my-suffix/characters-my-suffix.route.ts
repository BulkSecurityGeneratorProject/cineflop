import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CharactersMySuffixComponent } from './characters-my-suffix.component';
import { CharactersMySuffixDetailComponent } from './characters-my-suffix-detail.component';
import { CharactersMySuffixPopupComponent } from './characters-my-suffix-dialog.component';
import { CharactersMySuffixDeletePopupComponent } from './characters-my-suffix-delete-dialog.component';

export const charactersRoute: Routes = [
    {
        path: 'characters-my-suffix',
        component: CharactersMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.characters.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'characters-my-suffix/:id',
        component: CharactersMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.characters.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const charactersPopupRoute: Routes = [
    {
        path: 'characters-my-suffix-new',
        component: CharactersMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.characters.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'characters-my-suffix/:id/edit',
        component: CharactersMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.characters.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'characters-my-suffix/:id/delete',
        component: CharactersMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.characters.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
