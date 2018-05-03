import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    KeywordsMySuffixService,
    KeywordsMySuffixPopupService,
    KeywordsMySuffixComponent,
    KeywordsMySuffixDetailComponent,
    KeywordsMySuffixDialogComponent,
    KeywordsMySuffixPopupComponent,
    KeywordsMySuffixDeletePopupComponent,
    KeywordsMySuffixDeleteDialogComponent,
    keywordsRoute,
    keywordsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...keywordsRoute,
    ...keywordsPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KeywordsMySuffixComponent,
        KeywordsMySuffixDetailComponent,
        KeywordsMySuffixDialogComponent,
        KeywordsMySuffixDeleteDialogComponent,
        KeywordsMySuffixPopupComponent,
        KeywordsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        KeywordsMySuffixComponent,
        KeywordsMySuffixDialogComponent,
        KeywordsMySuffixPopupComponent,
        KeywordsMySuffixDeleteDialogComponent,
        KeywordsMySuffixDeletePopupComponent,
    ],
    providers: [
        KeywordsMySuffixService,
        KeywordsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogKeywordsMySuffixModule {}
