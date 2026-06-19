/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  plan?: string
  manageUrl?: string
}

const WelcomePremium = ({ name, plan, manageUrl }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>¡Bienvenido a ElectroLab Pro Premium!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandSection}>
          <Text style={brand}>ElectroLab Pro</Text>
        </Section>
        <Heading style={h1}>¡Bienvenido a Premium{name ? `, ${name}` : ''}! 🎉</Heading>
        <Text style={text}>
          Gracias por suscribirte al plan <strong>{plan || 'Premium'}</strong>. Tu acceso ya está activo
          y a partir de ahora navegarás <strong>sin anuncios</strong>, con todas las
          <strong> calculadoras avanzadas</strong> y el contenido exclusivo desbloqueado.
        </Text>
        <Section style={{ textAlign: 'center' as const, margin: '0 0 28px' }}>
          <Button style={button} href="https://electrolabpro.com/">Empezar a explorar</Button>
        </Section>
        <Text style={text}>
          Podés gestionar tu suscripción, cambiar de plan o cancelar cuando quieras desde tu cuenta:
        </Text>
        <Text style={textSmall}>
          <Link href={manageUrl || 'https://electrolabpro.com/account'} style={link}>
            {manageUrl || 'https://electrolabpro.com/account'}
          </Link>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          ¿Dudas o sugerencias? Respondé a este correo y te ayudamos. — J.A. Sánchez, ElectroLab Pro.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomePremium,
  subject: '¡Bienvenido a ElectroLab Pro Premium!',
  displayName: 'Bienvenida Premium',
  previewData: { name: 'Juan', plan: 'Premium mensual', manageUrl: 'https://electrolabpro.com/account' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const brandSection = { borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '24px' }
const brand = { fontSize: '16px', fontWeight: 700 as const, color: '#6366F1', margin: 0, letterSpacing: '-0.01em' }
const h1 = { fontSize: '24px', fontWeight: 700 as const, color: '#0B1428', margin: '0 0 16px', letterSpacing: '-0.02em' }
const text = { fontSize: '15px', color: '#374151', lineHeight: '1.6', margin: '0 0 20px' }
const textSmall = { fontSize: '13px', color: '#6B7280', lineHeight: '1.6', margin: '0 0 16px', wordBreak: 'break-all' as const }
const link = { color: '#6366F1', textDecoration: 'underline' }
const button = { backgroundColor: '#6366F1', color: '#ffffff', fontSize: '15px', fontWeight: 600 as const, borderRadius: '14px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#9CA3AF', margin: 0, lineHeight: '1.5' }
