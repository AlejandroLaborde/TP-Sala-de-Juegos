import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgilidadTatetiComponent } from './agilidad-tateti.component';

describe('AgilidadTatetiComponent', () => {
  let component: AgilidadTatetiComponent;
  let fixture: ComponentFixture<AgilidadTatetiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgilidadTatetiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgilidadTatetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
