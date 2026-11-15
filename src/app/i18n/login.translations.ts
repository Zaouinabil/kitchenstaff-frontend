export const loginFr = {
  'login.title': 'Connexion',
  'login.email': 'Email',
  'login.password': 'Mot de passe',
  'login.passwordPlaceholder': 'Votre mot de passe',
  'login.submitting': 'Connexion...',
  'login.submit': 'Se connecter',
  'login.hint': 'Utilisez votre compte administrateur, chef ou commis.',
  'login.signedInAs': 'Connecté comme :',
  'login.role': 'Rôle :',
  'login.logout': 'Se déconnecter',
  'login.success': 'Connexion réussie. Bienvenue {name}.',
  'login.error.required': 'Veuillez remplir l’email et le mot de passe.',
  'login.error.connection': 'Le serveur ne répond pas ou la connexion a expiré. Vérifiez que le backend est démarré et ouvrez l’application sur http://localhost:4200.',
  'login.error.credentials': 'Connexion impossible. Vérifiez vos identifiants.',
  'login.error.server': 'Une erreur du serveur empêche la connexion. Réessayez dans un instant.'
} as const;

export const loginEn = {
  'login.title': 'Sign in',
  'login.email': 'Email',
  'login.password': 'Password',
  'login.passwordPlaceholder': 'Your password',
  'login.submitting': 'Signing in...',
  'login.submit': 'Sign in',
  'login.hint': 'Use your administrator, chef or kitchen assistant account.',
  'login.signedInAs': 'Signed in as:',
  'login.role': 'Role:',
  'login.logout': 'Sign out',
  'login.success': 'Successfully signed in. Welcome {name}.',
  'login.error.required': 'Please enter your email and password.',
  'login.error.connection': 'The server is not responding or the connection has timed out. Check that the backend is running and open the application at http://localhost:4200.',
  'login.error.credentials': 'Unable to sign in. Check your credentials.',
  'login.error.server': 'A server error is preventing sign-in. Please try again shortly.'
} satisfies Record<keyof typeof loginFr, string>;

export const loginNl = {
  'login.title': 'Aanmelden',
  'login.email': 'E-mail',
  'login.password': 'Wachtwoord',
  'login.passwordPlaceholder': 'Uw wachtwoord',
  'login.submitting': 'Bezig met aanmelden...',
  'login.submit': 'Aanmelden',
  'login.hint': 'Gebruik uw account als beheerder, chef of keukenmedewerker.',
  'login.signedInAs': 'Aangemeld als:',
  'login.role': 'Rol:',
  'login.logout': 'Afmelden',
  'login.success': 'U bent aangemeld. Welkom {name}.',
  'login.error.required': 'Vul uw e-mailadres en wachtwoord in.',
  'login.error.connection': 'De server reageert niet of de verbinding is verlopen. Controleer of de backend actief is en open de applicatie op http://localhost:4200.',
  'login.error.credentials': 'Aanmelden is niet mogelijk. Controleer uw inloggegevens.',
  'login.error.server': 'Door een serverfout kunt u zich niet aanmelden. Probeer het zo nog eens.'
} satisfies Record<keyof typeof loginFr, string>;
