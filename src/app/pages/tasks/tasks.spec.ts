import { createTestStorage } from '../../../testing/local-storage';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TasksPage } from './tasks';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', createTestStorage());
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('asks an unauthenticated user to connect', () => {
    expect(component).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('Connectez-vous pour afficher les tâches.');
  });
});
