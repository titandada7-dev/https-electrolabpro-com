import type { ComponentType } from 'npm:react@18.3.1'
import { template as welcomePremium } from './welcome-premium.tsx'
import { template as premiumContentUpdate } from './premium-content-update.tsx'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'welcome-premium': welcomePremium,
  'premium-content-update': premiumContentUpdate,
}
