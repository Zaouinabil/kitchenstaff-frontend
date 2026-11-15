import { createTestStorage } from '../../../testing/local-storage';
import 'zone.js';
import { NgZone, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TasksPage } from './tasks';
import { LanguageService } from '../../i18n/language.service';

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let http: HttpTestingController;
  let zone: NgZone;

  beforeEach(async () => {
    vi.stubGlobal('localStorage', createTestStorage());
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [provideZoneChangeDetection(), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    zone = TestBed.inject(NgZone);
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('asks an unauthenticated user to connect', () => {
    expect(component).toBeTruthy();
    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('Connectez-vous pour afficher les tâches.');
  });

  it('retranslates task and field errors that are already visible', async () => {
    const language = TestBed.inject(LanguageService);
    zone.run(() => {
      component.userRole = 'ADMIN';
      component.submitTask();
    });
    await fixture.whenStable();

    language.setLanguage('en');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Sign in to view tasks.');
    expect(element.querySelector('.field-error')?.textContent?.trim()).toBe('An item is required.');
    expect(element.querySelector('.form-message')?.textContent?.trim())
      .toBe('Please correct the errors in the form.');

    language.setLanguage('nl');
    await fixture.whenStable();
    expect(element.textContent).toContain('Meld u aan om de taken te bekijken.');
    expect(element.querySelector('.field-error')?.textContent?.trim()).toBe('Een artikel is verplicht.');
    expect(element.querySelector('.form-message')?.textContent?.trim())
      .toBe('Corrigeer de fouten in het formulier.');
  });

  it('sends the API status code when the Dutch status filter is clicked', async () => {
    localStorage.setItem('token', 'test-token');
    TestBed.inject(LanguageService).setLanguage('nl');
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const inProgress = Array.from(element.querySelectorAll<HTMLButtonElement>('.status-filters button'))
      .find((button) => button.textContent?.trim() === 'Bezig');
    expect(inProgress).toBeDefined();
    zone.run(() => inProgress!.click());

    const filtered = http.expectOne((request) => request.url.endsWith('/tasks')
      && request.params.get('status') === 'EN_COURS');
    expect(filtered.request.headers.get('Authorization')).toBe('Bearer test-token');
    const summary = http.expectOne((request) => request.url.endsWith('/tasks')
      && !request.params.has('status'));
    zone.run(() => {
      filtered.flush([]);
      summary.flush([]);
    });
    await fixture.whenStable();
    expect(component.selectedStatus).toBe('EN_COURS');
  });

  it('keeps API values and user data unchanged when creating a task in English', async () => {
    localStorage.setItem('token', 'test-token');
    const language = TestBed.inject(LanguageService);
    language.setLanguage('en');
    zone.run(() => {
      component.userRole = 'ADMIN';
      component.items = [{
        id: 1, name: 'Préparer les carottes', unit: 'kg', categoryId: 1,
        categoryName: 'Légumes', active: true
      }];
      component.users = [{
        id: 3, name: 'Commis Cuisine', email: 'commis@kitchenstaff.test', role: 'COMMIS', active: true
      }];
      component.newTask = {
        itemId: 1, assignedUserId: 3, quantity: 1.5, priority: 'NORMALE',
        taskDate: '2026-11-15', comment: 'Sans sel'
      };
    });
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const priority = element.querySelector<HTMLSelectElement>('select[name="priority"]')!;
    const urgentOption = Array.from(priority.options).find((option) => option.textContent === 'Urgent')!;
    expect(urgentOption).toBeDefined();
    zone.run(() => {
      priority.value = urgentOption.value;
      priority.dispatchEvent(new Event('change'));
    });
    await fixture.whenStable();
    zone.run(() => component.submitTask());

    const creation = http.expectOne((request) => request.url.endsWith('/tasks') && request.method === 'POST');
    expect(creation.request.body).toEqual({
      itemId: 1, assignedUserId: 3, quantity: 1.5, priority: 'URGENTE',
      taskDate: '2026-11-15', comment: 'Sans sel'
    });
    zone.run(() => {
      creation.flush({ id: 7 });
      http.expectOne((request) => request.url.endsWith('/tasks') && request.method === 'GET').flush([]);
    });
    await fixture.whenStable();
    expect(element.querySelector('.tasks-page > .success')?.textContent?.trim())
      .toBe('Task created successfully.');

    language.setLanguage('nl');
    await fixture.whenStable();
    expect(element.querySelector('.tasks-page > .success')?.textContent?.trim()).toBe('Taak aangemaakt.');
  });
});
