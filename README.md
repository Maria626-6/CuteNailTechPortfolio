# Marshmallowmami Nails

Portafolio web de Marshmallowmami Nails, creado con Next.js.

## Ejecutar en local

En Windows, instala Git for Windows para tener Git Bash. Al abrir este proyecto
en VS Code, su configuración selecciona el perfil `Git Bash` como terminal
predeterminada. Si ya tenías una terminal abierta, ciérrala y abre una nueva.
También puedes usar PowerShell: los scripts del proyecto ya son compatibles con
Windows y no requieren escribir variables con sintaxis de Bash.

Necesitas Node.js `24.22.3` y pnpm `10.34.3` (las versiones configuradas para
este proyecto). Comprueba que estén instalados:

```bash
node --version
pnpm --version
```

Desde la raíz del proyecto, instala las dependencias y arranca el servidor:

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. Para
detener el servidor, vuelve a Bash y pulsa `Ctrl+C`.

Si el puerto `3000` ya está ocupado, puedes usar otro, por ejemplo:

```bash
PORT=3001 pnpm dev
```

En PowerShell:

```powershell
$env:PORT = "3001"
pnpm dev
```

En ese caso, abre [http://localhost:3001](http://localhost:3001).

## Nota sobre las reservas

La página principal y su galería usan imágenes incluidas en `public/images` y
se pueden previsualizar localmente. La página `/book` muestra el calendario de
citas integrado de Google Calendar. El formulario anterior y las consultas al
backend de Payload no se utilizan en esta ruta.
