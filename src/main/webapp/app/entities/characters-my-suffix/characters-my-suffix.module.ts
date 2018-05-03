import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    CharactersMySuffixService,
    CharactersMySuffixPopupService,
    CharactersMySuffixComponent,
    CharactersMySuffixDetailComponent,
    CharactersMySuffixDialogComponent,
    CharactersMySuffixPopupComponent,
    CharactersMySuffixDeletePopupComponent,
    CharactersMySuffixDeleteDialogComponent,
    charactersRoute,
    charactersPopupRoute,
} from './';

const ENTITY_STATES = [
    ...charactersRoute,
    ...charactersPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CharactersMySuffixComponent,
        CharactersMySuffixDetailComponent,
        CharactersMySuffixDialogComponent,
        CharactersMySuffixDeleteDialogComponent,
        CharactersMySuffixPopupComponent,
        CharactersMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CharactersMySuffixComponent,
        CharactersMySuffixDialogComponent,
        CharactersMySuffixPopupComponent,
        CharactersMySuffixDeleteDialogComponent,
        CharactersMySuffixDeletePopupComponent,
    ],
    providers: [
        CharactersMySuffixService,
        CharactersMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogCharactersMySuffixModule {}
