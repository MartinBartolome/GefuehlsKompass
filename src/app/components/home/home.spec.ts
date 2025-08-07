import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FeelingsService } from '../../services/feelings';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockFeelingsService: jasmine.SpyObj<FeelingsService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockFeelingsService = jasmine.createSpyObj('FeelingsService', ['setCurrentStep', 'reset']);

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FeelingsService, useValue: mockFeelingsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
