import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogIdeasMySuffixModule } from './ideas-my-suffix/ideas-my-suffix.module';
import { BlogRolesMySuffixModule } from './roles-my-suffix/roles-my-suffix.module';
import { BlogKeywordsMySuffixModule } from './keywords-my-suffix/keywords-my-suffix.module';
import { BlogScriptsMySuffixModule } from './scripts-my-suffix/scripts-my-suffix.module';
import { BlogCharactersMySuffixModule } from './characters-my-suffix/characters-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BlogIdeasMySuffixModule,
        BlogRolesMySuffixModule,
        BlogKeywordsMySuffixModule,
        BlogScriptsMySuffixModule,
        BlogCharactersMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogEntityModule {}
