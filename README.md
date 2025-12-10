# Backend - Gestor de Presupuestos

Este proyecto es un backend desarrollado en **Node.js + Express + MySQL** que permite gestionar clientes y presupuestos de manera profesional. Forma parte del sistema completo de gestión.

---

## 🚀 Características
- CRUD completo de **Clientes** (crear, listar, editar, eliminar).
- CRUD completo de **Presupuestos** (crear, listar, editar, eliminar).
- Validaciones básicas en los endpoints.
- Conexión a base de datos MySQL.
- Estructura modular y escalable.

---

## 📦 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/blackgoku-97/backend-presupuestos.git
cd backend-presupuestos
```

2. 	Instalar dependencias:
```bash
npm install
```

3. 	Configurar variables de entorno: Crear un archivo .env en la raíz con:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=presupuestos_db
PORT=4000
```

4. 	Ejecutar migraciones o crear tablas según schema.sql

## ▶️ Uso

1. Iniciar el servidor:
```bash
npm run dev
```

2. El backend quedará disponible en:
```
http://localhost:4000
```

## 📚 Endpoints principales

### Health
```
- GET /health → Conexión con base de datos
```

### Clientes
```
- GET /clientes → Listar clientes
- POST /clientes → Crear cliente
- PUT /clientes/:id → Editar cliente
- DELETE /clientes/:id → Eliminar cliente
```

### Presupuestos
```
- GET /presupuestos → Listar presupuestos
- POST /presupuestos → Crear presupuesto
- PUT /presupuestos/:id → Editar presupuesto
- DELETE /presupuestos/:id → Eliminar presupuesto
```

## 🛠️ Tecnologías
- 	Node.js
- 	TypeScript
- 	Express
- 	MySQL
- 	dotenv
- 	nodemon (para desarrollo)

## 📂 Estructura del Proyecto

backend-presupuestos/
│── src/
│   ├── controllers/     # Lógica de endpoints (reciben request/response)
│   │   └── clienteController.ts
│   │   └── presupuestoController.ts
│   │
│   ├── routes/          # Definición de rutas Express
│   │   └── clientes.ts
│   │   └── presupuestos.ts
│   │
│   ├── db.ts           # Configuración principal de MySQL
│   └── index.ts        # Punto de entrada del servidor
│
├── .env.example         # Ejemplo de variables de entorno
├── package-lock.json
├── package.json
├── tsconfig.json        # Configuración de TypeScript
└── README.md

## 📌 Notas
- 	No subir el archivo .env a GitHub.
- 	Puedes incluir un .env.example para guiar a otros desarrolladores.
- 	Este backend está pensado para integrarse con el frontend en React/TypeScript.

## 📄 Licencia
    Este proyecto está bajo la licencia MIT.