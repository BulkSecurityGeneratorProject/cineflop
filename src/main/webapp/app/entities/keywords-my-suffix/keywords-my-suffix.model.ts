import { BaseEntity } from './../../shared';

export class KeywordsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public keyword?: string,
        public ideasId?: number,
    ) {
    }
}
