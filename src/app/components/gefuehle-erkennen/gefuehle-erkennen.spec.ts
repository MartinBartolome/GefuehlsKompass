import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FeelingsService } from '../../services/feelings';
import { signal } from '@angular/core';

import { GefuehleErkennen } from './gefuehle-erkennen';

describe('GefuehleErkennen', () => {
  let component: GefuehleErkennen;
  let fixture: ComponentFixture<GefuehleErkennen>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockFeelingsService: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockFeelingsService = {
      setCurrentStep: jasmine.createSpy('setCurrentStep'),
      getFeelingsByCategory: jasmine.createSpy('getFeelingsByCategory').and.returnValue({}),
      selectedFeelings: signal([]),
      toggleFeeling: jasmine.createSpy('toggleFeeling'),
      isFeelingSelected: jasmine.createSpy('isFeelingSelected').and.returnValue(false)
    };

    await TestBed.configureTestingModule({
      imports: [GefuehleErkennen],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FeelingsService, useValue: mockFeelingsService }
      ]
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
