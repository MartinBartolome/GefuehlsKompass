import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GefuehleBewaeltigen } from './gefuehle-bewaeltigen';

describe('GefuehleBewaeltigen', () => {
  let component: GefuehleBewaeltigen;
  let fixture: ComponentFixture<GefuehleBewaeltigen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GefuehleBewaeltigen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GefuehleBewaeltigen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
