# E2E Testing – Plataforma Altempo

Este repositorio contiene pruebas End-to-End (E2E) automatizadas para la plataforma **Altempo**, desarrolladas utilizando **Playwright con JavaScript**.
Las pruebas validan los flujos críticos del sistema desde la perspectiva del usuario final.

---

## Tecnologías utilizadas

- **Node.js**
- **Playwright**
- **JavaScript**
- **Chromium (por defecto)**

---

## Estructura del proyecto

tests/
├── auth/
│ ├── signup.spec.js
│ ├── login.spec.js
│ └── password-reset.spec.js
├── onboarding/
│ └── onboarding.spec.js
├── profile/
│ └── profile.spec.js
├── team/
│ └── team.spec.js
├── services/
│ └── services.spec.js
├── availability/
│ └── availability.spec.js
├── notifications/
│ └── notifications.spec.js
└── navigation/
└── navigation.spec.js

---

## Requisitos previos

Antes de ejecutar las pruebas, asegúrate de tener instalado:

- Node.js (v16 o superior)
- npm

Verificar versiones:

node -v
npm -v

---

## Instalación del proyecto

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Instalar dependencias:

```bash
npm install
```

3. Instalar navegadores de Playwright:

```bash
npx playwright install
```

---

## Ejecución de pruebas

### Ejecutar todas las pruebas

```bash
npx playwright test
```

---

### Ejecutar pruebas de Auth

```bash
npx playwright test tests/auth
```

O de forma individual:

```bash
npx playwright test tests/auth/login.spec.js
npx playwright test tests/auth/signup.spec.js
npx playwright test tests/auth/password-reset.spec.js
```

---

### Ejecutar pruebas de Onboarding

```bash
npx playwright test tests/onboarding/onboarding.spec.js
```

---

### Ejecutar pruebas de Profile

```bash
npx playwright test tests/profile/profile.spec.js
```

---

### Ejecutar pruebas de Team

```bash
npx playwright test tests/team/team.spec.js
```

---

### Ejecutar pruebas de Services

```bash
npx playwright test tests/services/services.spec.js
```

---

### Ejecutar pruebas de Availability

```bash
npx playwright test tests/availability/availability.spec.js
```

---

### Ejecutar pruebas de Notifications

```bash
npx playwright test tests/notifications/notifications.spec.js
```

---

### Ejecutar pruebas de Navigation

```bash
npx playwright test tests/navigation/navigation.spec.js
```

---

## Reporte de resultados

Después de ejecutar las pruebas, se genera automáticamente un reporte HTML.

Para visualizarlo:

```bash
npx playwright show-report
```

---

## Autor

**Jonatan Ernesto Segura Reymundo**
QA Automation – Playwright
