import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    IdeasMySuffixService,
    IdeasMySuffixPopupService,
    IdeasMySuffixComponent,
    IdeasMySuffixDetailComponent,
    IdeasMySuffixDialogComponent,
    IdeasMySuffixPopupComponent,
    IdeasMySuffixDeletePopupComponent,
    IdeasMySuffixDeleteDialogComponent,
    ideasRoute,
    ideasPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ideasRoute,
    ...ideasPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IdeasMySuffixComponent,
        IdeasMySuffixDetailComponent,
        IdeasMySuffixDialogComponent,
        IdeasMySuffixDeleteDialogComponent,
        IdeasMySuffixPopupComponent,
        IdeasMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        IdeasMySuffixComponent,
        IdeasMySuffixDialogComponent,
        IdeasMySuffixPopupComponent,
        IdeasMySuffixDeleteDialogComponent,
        IdeasMySuffixDeletePopupComponent,
    ],
    providers: [
        IdeasMySuffixService,
        IdeasMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogIdeasMySuffixModule {}
