import { BaseEntity } from './../../shared';

export const enum Genders {
    'COMEDY',
    'LOVE',
    'FANTASTIC',
    'THRILLER',
    'OPERA',
    'HORROR',
    'ACTION'
}

export class IdeasMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public synopsis?: any,
        public context?: string,
        public imagepath?: string,
        public gender?: Genders,
        public keywords?: BaseEntity[],
        public roles?: BaseEntity[],
        public scriptsId?: number,
    ) {
    }
}
