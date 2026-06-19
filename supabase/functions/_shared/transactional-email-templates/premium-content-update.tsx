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
  contentTitle?: string
  contentDescription?: string
  contentUrl?: string
}

const PremiumContentUpdate = ({ name, contentTitle, contentDescription, contentUrl }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>{contentTitle ? `Nuevo en Premium: ${contentTitle}` : 'Nuevo contenido Premium disponible'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brandSection}>
          <Text style={brand}>ElectroLab Pro · Premium</Text>
        </Section>
        <Heading style={h1}>
          {name ? `${name}, ` : ''}hay contenido nuevo para vos
        </Heading>
        <Text style={text}>
          Sumamos algo nuevo a tu zona Premium:
        </Text>
        <Section style={card}>
          <Text style={cardTitle}>{contentTitle || 'Nuevo contenido Premium'}</Text>
          {contentDescription && <Text style={cardDesc}>{contentDescription}</Text>}
        </Section>
        <Section style={{ textAlign: 'center' as const, margin: '0 0 28px' }}>
          <Button style={button} href={contentUrl || 'https://electrolabpro.com/premium/contenido'}>
            Abrir ahora
          </Button>
        </Section>
        <Text style={textSmall}>
          O entrá directamente:{' '}
          <Link href={contentUrl || 'https://electrolabpro.com/premium/contenido'} style={link}>
            {contentUrl || 'https://electrolabpro.com/premium/contenido'}
          </Link>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Recibís este correo porque activaste las notificaciones de contenido Premium.
          Podés desactivarlas desde tu hub Premium cuando quieras.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PremiumContentUpdate,
  subject: (data: Props) =>
    data?.contentTitle ? `Nuevo en Premium: ${data.contentTitle}` : 'Nuevo contenido Premium disponible',
  displayName: 'Aviso de contenido Premium',
  previewData: {
    name: 'Juan',
    contentTitle: 'Simulador de filtros activos',
    contentDescription: 'Diseñá filtros pasa-bajos / pasa-altos de 2º orden y mirá su respuesta en frecuencia.',
    contentUrl: 'https://electrolabpro.com/premium/contenido',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const brandSection = { borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '24px' }
const brand = { fontSize: '16px', fontWeight: 700 as const, color: '#6366F1', margin: 0, letterSpacing: '-0.01em' }
const h1 = { fontSize: '24px', fontWeight: 700 as const, color: '#0B1428', margin: '0 0 16px', letterSpacing: '-0.02em' }
const text = { fontSize: '15px', color: '#374151', lineHeight: '1.6', margin: '0 0 16px' }
const textSmall = { fontSize: '13px', color: '#6B7280', lineHeight: '1.6', margin: '0 0 16px', wordBreak: 'break-all' as const }
const card = { backgroundColor: '#F5F6FA', border: '1px solid #e5e7eb', borderRadius: '14px', padding: '18px 20px', margin: '0 0 24px' }
const cardTitle = { fontSize: '16px', fontWeight: 700 as const, color: '#0B1428', margin: '0 0 6px' }
const cardDesc = { fontSize: '14px', color: '#374151', lineHeight: '1.55', margin: 0 }
const link = { color: '#6366F1', textDecoration: 'underline' }
const button = { backgroundColor: '#6366F1', color: '#ffffff', fontSize: '15px', fontWeight: 600 as const, borderRadius: '14px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#9CA3AF', margin: 0, lineHeight: '1.5' }
