import { BaseEntity } from './../../shared';

export class RolesMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public role?: string,
        public ideasId?: number,
    ) {
    }
}
