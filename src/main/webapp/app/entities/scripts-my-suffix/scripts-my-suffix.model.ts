import { BaseEntity } from './../../shared';

export class ScriptsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public ideas?: BaseEntity[],
    ) {
    }
}
