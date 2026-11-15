import { loginEn, loginFr, loginNl } from './login.translations';
import { tasksEn, tasksFr, tasksNl } from './tasks.translations';

const commonFr = {
  'common.language': 'Langue',
  'common.status.todo': 'À faire',
  'common.status.inProgress': 'En cours',
  'common.status.completed': 'Terminée',
  'common.status.cancelled': 'Annulée',
  'common.priority.low': 'Basse',
  'common.priority.normal': 'Normale',
  'common.priority.high': 'Haute',
  'common.priority.urgent': 'Urgente',
  'common.role.admin': 'Administrateur',
  'common.role.chef': 'Chef de cuisine',
  'common.role.commis': 'Commis de cuisine'
} as const;

const commonEn = {
  'common.language': 'Language',
  'common.status.todo': 'To do',
  'common.status.inProgress': 'In progress',
  'common.status.completed': 'Completed',
  'common.status.cancelled': 'Cancelled',
  'common.priority.low': 'Low',
  'common.priority.normal': 'Normal',
  'common.priority.high': 'High',
  'common.priority.urgent': 'Urgent',
  'common.role.admin': 'Administrator',
  'common.role.chef': 'Head chef',
  'common.role.commis': 'Kitchen assistant'
} satisfies Record<keyof typeof commonFr, string>;

const commonNl = {
  'common.language': 'Taal',
  'common.status.todo': 'Te doen',
  'common.status.inProgress': 'Bezig',
  'common.status.completed': 'Voltooid',
  'common.status.cancelled': 'Geannuleerd',
  'common.priority.low': 'Laag',
  'common.priority.normal': 'Normaal',
  'common.priority.high': 'Hoog',
  'common.priority.urgent': 'Dringend',
  'common.role.admin': 'Beheerder',
  'common.role.chef': 'Keukenchef',
  'common.role.commis': 'Keukenmedewerker'
} satisfies Record<keyof typeof commonFr, string>;

export type TranslationKey = keyof typeof commonFr | keyof typeof loginFr | keyof typeof tasksFr;
export type Language = 'fr' | 'en' | 'nl';

// All languages must cover the same keys. French is also the runtime fallback.
export const TRANSLATIONS = {
  fr: { ...commonFr, ...loginFr, ...tasksFr },
  en: { ...commonEn, ...loginEn, ...tasksEn },
  nl: { ...commonNl, ...loginNl, ...tasksNl }
} satisfies Record<Language, Record<TranslationKey, string>>;
