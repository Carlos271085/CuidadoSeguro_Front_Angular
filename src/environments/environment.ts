export const environment = {
  production: false,
  msal: {
    // Reemplaza con tu Client ID (ID de aplicación) de Azure/Entra ID
    clientId: '00000000-0000-0000-0000-000000000000',
    // Reemplaza con tu Tenant ID de Azure/Entra ID ('common' permite cuentas Microsoft organizativas y personales)
    tenantId: 'common',
    // Debe coincidir con la Redirect URI registrada en Azure (Configuración > Autenticación)
    redirectUri: 'http://localhost:4200',
    scopes: ['user.read'],
  },
};