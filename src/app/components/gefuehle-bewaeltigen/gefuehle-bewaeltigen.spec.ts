import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FeelingsService } from '../../services/feelings';
import { signal } from '@angular/core';

import { GefuehleBewaeltigen } from './gefuehle-bewaeltigen';

describe('GefuehleBewaeltigen', () => {
  let component: GefuehleBewaeltigen;
  let fixture: ComponentFixture<GefuehleBewaeltigen>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockFeelingsService: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockFeelingsService = {
      setCurrentStep: jasmine.createSpy('setCurrentStep'),
      selectedFeelings: signal([{ id: 'test', name: 'Test', category: 'Test', description: 'Test description', copingStrategies: ['Strategy 1'] }])
    };

    await TestBed.configureTestingModule({
      imports: [GefuehleBewaeltigen],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FeelingsService, useValue: mockFeelingsService }
      ]
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
