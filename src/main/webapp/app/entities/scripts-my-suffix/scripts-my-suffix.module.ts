import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import {
    ScriptsMySuffixService,
    ScriptsMySuffixPopupService,
    ScriptsMySuffixComponent,
    ScriptsMySuffixDetailComponent,
    ScriptsMySuffixDialogComponent,
    ScriptsMySuffixPopupComponent,
    ScriptsMySuffixDeletePopupComponent,
    ScriptsMySuffixDeleteDialogComponent,
    scriptsRoute,
    scriptsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scriptsRoute,
    ...scriptsPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ScriptsMySuffixComponent,
        ScriptsMySuffixDetailComponent,
        ScriptsMySuffixDialogComponent,
        ScriptsMySuffixDeleteDialogComponent,
        ScriptsMySuffixPopupComponent,
        ScriptsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ScriptsMySuffixComponent,
        ScriptsMySuffixDialogComponent,
        ScriptsMySuffixPopupComponent,
        ScriptsMySuffixDeleteDialogComponent,
        ScriptsMySuffixDeletePopupComponent,
    ],
    providers: [
        ScriptsMySuffixService,
        ScriptsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogScriptsMySuffixModule {}
