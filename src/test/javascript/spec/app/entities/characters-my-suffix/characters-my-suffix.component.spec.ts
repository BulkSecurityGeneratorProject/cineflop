/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { CharactersMySuffixComponent } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix.component';
import { CharactersMySuffixService } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix.service';
import { CharactersMySuffix } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix.model';

describe('Component Tests', () => {

    describe('CharactersMySuffix Management Component', () => {
        let comp: CharactersMySuffixComponent;
        let fixture: ComponentFixture<CharactersMySuffixComponent>;
        let service: CharactersMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [CharactersMySuffixComponent],
                providers: [
                    CharactersMySuffixService
                ]
            })
            .overrideTemplate(CharactersMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CharactersMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CharactersMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CharactersMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.characters[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
