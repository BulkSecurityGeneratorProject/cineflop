/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlogTestModule } from '../../../test.module';
import { CharactersMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix-detail.component';
import { CharactersMySuffixService } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix.service';
import { CharactersMySuffix } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix.model';

describe('Component Tests', () => {

    describe('CharactersMySuffix Management Detail Component', () => {
        let comp: CharactersMySuffixDetailComponent;
        let fixture: ComponentFixture<CharactersMySuffixDetailComponent>;
        let service: CharactersMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [CharactersMySuffixDetailComponent],
                providers: [
                    CharactersMySuffixService
                ]
            })
            .overrideTemplate(CharactersMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CharactersMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CharactersMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CharactersMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.characters).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
