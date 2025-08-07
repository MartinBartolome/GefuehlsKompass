import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GefuehleAnnehmen } from './gefuehle-annehmen';

describe('GefuehleAnnehmen', () => {
  let component: GefuehleAnnehmen;
  let fixture: ComponentFixture<GefuehleAnnehmen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GefuehleAnnehmen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GefuehleAnnehmen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
