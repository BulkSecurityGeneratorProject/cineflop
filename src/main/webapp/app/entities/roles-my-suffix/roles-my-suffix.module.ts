import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    RolesMySuffixService,
    RolesMySuffixPopupService,
    RolesMySuffixComponent,
    RolesMySuffixDetailComponent,
    RolesMySuffixDialogComponent,
    RolesMySuffixPopupComponent,
    RolesMySuffixDeletePopupComponent,
    RolesMySuffixDeleteDialogComponent,
    rolesRoute,
    rolesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rolesRoute,
    ...rolesPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RolesMySuffixComponent,
        RolesMySuffixDetailComponent,
        RolesMySuffixDialogComponent,
        RolesMySuffixDeleteDialogComponent,
        RolesMySuffixPopupComponent,
        RolesMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        RolesMySuffixComponent,
        RolesMySuffixDialogComponent,
        RolesMySuffixPopupComponent,
        RolesMySuffixDeleteDialogComponent,
        RolesMySuffixDeletePopupComponent,
    ],
    providers: [
        RolesMySuffixService,
        RolesMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogRolesMySuffixModule {}
