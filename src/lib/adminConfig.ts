/**
 * Lista de emails autorizados a entrar en /admin/ads.
 * Añade tu email aquí (sensible a mayúsculas/minúsculas: se normaliza a minúsculas).
 */
export const ADMIN_EMAILS: string[] = [
  // "tuemail@gmail.com",
];

export const isAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
};
