import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FeelingsService } from '../../services/feelings';
import { signal } from '@angular/core';

import { GefuehleAnnehmen } from './gefuehle-annehmen';

describe('GefuehleAnnehmen', () => {
  let component: GefuehleAnnehmen;
  let fixture: ComponentFixture<GefuehleAnnehmen>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockFeelingsService: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockFeelingsService = {
      setCurrentStep: jasmine.createSpy('setCurrentStep'),
      selectedFeelings: signal([{ id: 'test', name: 'Test', category: 'Test', description: 'Test description', copingStrategies: [] }])
    };

    await TestBed.configureTestingModule({
      imports: [GefuehleAnnehmen],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FeelingsService, useValue: mockFeelingsService }
      ]
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
