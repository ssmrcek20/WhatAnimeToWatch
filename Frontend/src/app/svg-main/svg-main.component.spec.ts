import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMainComponent } from './svg-main.component';

describe('SvgMainComponent', () => {
  let component: SvgMainComponent;
  let fixture: ComponentFixture<SvgMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
