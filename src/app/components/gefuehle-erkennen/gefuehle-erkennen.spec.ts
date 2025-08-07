import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GefuehleErkennen } from './gefuehle-erkennen';

describe('GefuehleErkennen', () => {
  let component: GefuehleErkennen;
  let fixture: ComponentFixture<GefuehleErkennen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GefuehleErkennen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GefuehleErkennen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
