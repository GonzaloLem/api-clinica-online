# api-clinica-online

## Rutas de Autenticación 🔑

### 1. Registrar un usuario
- **Ruta:** `POST /api/autenticacion/registrar`
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:**
    - `nombre`: string
    - `apellido`: string
    - `email`: string (debe ser un correo electrónico válido)
    - `contraseña`: string
    - `imagen_usuario`: archivo (opcional)
- **Validaciones:**
  - `validarCuerpo`: Verifica que el cuerpo de la solicitud esté completo.
  - `validarCampos`: Valida que los campos requeridos sean correctos.
- **Respuesta:**
  - **Código 201:** Usuario registrado exitosamente.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 2. Iniciar sesión
- **Ruta:** `POST /api/autenticacion/login`
- **Descripción:** Inicia sesión para un usuario existente.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:**
    - `email`: string (debe ser un correo electrónico válido)
    - `contraseña`: string
- **Validaciones:**
  - `validarCuerpo`: Verifica que el cuerpo de la solicitud esté completo.
  - `validarCorreoEmail`: Valida que el correo electrónico sea correcto.
- **Respuesta:**
  - **Código 200:** Inicio de sesión exitoso, con datos del usuario y un token de autenticación.
  - **Código 401:** Credenciales incorrectas.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

## Rutas de Disponibilidad 📅

### 1. Insertar disponibilidad
- **Ruta:** `POST /api/disponibilidad/insertar`
- **Descripción:** Inserta una nueva disponibilidad en el sistema.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:** (Define los campos que se requieren aquí)
- **Middleware:**
  - `verificarPermisos`: Verifica que el usuario tenga permisos adecuados para realizar la acción.
- **Respuesta:**
  - **Código 201:** Disponibilidad insertada exitosamente.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 2. Modificar disponibilidad
- **Ruta:** `POST /api/disponibilidad/modificar`
- **Descripción:** Modifica una disponibilidad existente.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:** (Define los campos que se requieren aquí)
- **Middleware:**
  - `verificarPermisos`: Verifica que el usuario tenga permisos adecuados para realizar la acción.
- **Respuesta:**
  - **Código 200:** Disponibilidad modificada exitosamente.
  - **Código 404:** Disponibilidad no encontrada.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 3. Agregar disponibilidad
- **Ruta:** `POST /api/disponibilidad/agregar`
- **Descripción:** Agrega disponibilidad a un especialista.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:** (Define los campos que se requieren aquí)
- **Middleware:**
  - `verificarPermisos`: Verifica que el usuario tenga permisos adecuados para realizar la acción.
- **Respuesta:**
  - **Código 200:** Disponibilidad agregada exitosamente.
  - **Código 404:** Especialista o especialidad no encontrada.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 4. Eliminar disponibilidad
- **Ruta:** `DELETE /api/disponibilidad/eliminar/:id_especialista/:id_especialidad/:id_horario`
- **Descripción:** Elimina una disponibilidad específica.
- **Parámetros:**
  - `id_especialista`: ID del especialista.
  - `id_especialidad`: ID de la especialidad.
  - `id_horario`: ID del horario.
- **Middleware:**
  - `verificarPermisos`: Verifica que el usuario tenga permisos adecuados para realizar la acción.
- **Respuesta:**
  - **Código 204:** Disponibilidad eliminada exitosamente.
  - **Código 404:** Disponibilidad no encontrada.

### 5. Obtener disponibilidad
- **Ruta:** `GET /api/disponibilidad/obtener/:id_especialista/:id_especialidad?`
- **Descripción:** Obtiene la disponibilidad de un especialista específico, opcionalmente filtrada por especialidad.
- **Parámetros:**
  - `id_especialista`: ID del especialista.
  - `id_especialidad`: (opcional) ID de la especialidad.
- **Respuesta:**
  - **Código 200:** Disponibilidad encontrada.
  - **Código 404:** Disponibilidad no encontrada.

## Rutas de Especialidad 🩺

### 1. Insertar especialidad
- **Ruta:** `POST /api/especialidad/insertar`
- **Descripción:** Inserta una nueva especialidad en el sistema.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:**
    - `especialidad`: string (nombre de la especialidad)
    - `imagen_especialidad`: archivo (opcional)
- **Respuesta:**
  - **Código 201:** Especialidad insertada exitosamente.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 2. Obtener especialidades
- **Ruta:** `GET /api/especialidad/obtener/:identificador?`
- **Descripción:** Obtiene una lista de especialidades, opcionalmente filtrada por un identificador específico.
- **Parámetros:**
  - `identificador`: (opcional) ID o nombre de la especialidad.
- **Respuesta:**
  - **Código 200:** Lista de especialidades encontradas.
  - **Código 404:** Especialidad no encontrada.

## Rutas de Turno 📅

### 1. Insertar turno
- **Ruta:** `POST /api/turno/insertar`
- **Descripción:** Inserta un nuevo turno en el sistema.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:** (Define los campos que se requieren aquí, como `especialista`, `especialidad`, `paciente`, `fecha`, etc.)
- **Middleware:** (Puedes incluir los middlewares comentados si son necesarios)
  - `validarCamposTurnos`: Valida que los campos requeridos sean correctos.
  - `validarFormatoHoraTurno`: Verifica que el formato de la hora sea correcto.
  - `validarDisponibilidadTurno`: Comprueba que el turno esté disponible.
- **Respuesta:**
  - **Código 201:** Turno insertado exitosamente.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 2. Cancelar turno
- **Ruta:** `POST /api/turno/cancelar`
- **Descripción:** Cancela un turno existente.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:** (Define los campos que se requieren aquí, como `turnoId`, etc.)
- **Middleware:** (Puedes incluir los middlewares comentados si son necesarios)
  - `validarCamposTurnos`: Valida que los campos requeridos sean correctos.
  - `validarFormatoHoraTurno`: Verifica que el formato de la hora sea correcto.
  - `validarDisponibilidadTurno`: Comprueba que el turno esté disponible.
- **Respuesta:**
  - **Código 200:** Turno cancelado exitosamente.
  - **Código 404:** Turno no encontrado.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 3. Obtener turnos disponibles
- **Ruta:** `GET /api/turno/obtener/disponibles/:id_especialista/:id_especialidad`
- **Descripción:** Obtiene una lista de turnos disponibles para un especialista y especialidad específicos.
- **Parámetros:**
  - `id_especialista`: ID del especialista.
  - `id_especialidad`: ID de la especialidad.
- **Respuesta:**
  - **Código 200:** Lista de turnos disponibles.
  - **Código 404:** No hay turnos disponibles.

### 4. Obtener mis turnos
- **Ruta:** `GET /api/turno/obtener/turnos/:id`
- **Descripción:** Obtiene la lista de turnos de un usuario específico.
- **Parámetros:**
  - `id`: ID del usuario.
- **Middleware:**
  - `verificarUsuario`: Verifica que el usuario tenga permisos adecuados para acceder a sus turnos.
- **Respuesta:**
  - **Código 200:** Lista de turnos encontrados.
  - **Código 404:** No se encontraron turnos.

### 5. Obtener mis turnos pendientes
- **Ruta:** `GET /api/turno/obtener/turnos/pendientes/:id`
- **Descripción:** Obtiene la lista de turnos pendientes para un usuario específico.
- **Parámetros:**
  - `id`: ID del usuario.
- **Middleware:**
  - `verificarUsuario`: Verifica que el usuario tenga permisos adecuados para acceder a sus turnos.
- **Respuesta:**
  - **Código 200:** Lista de turnos pendientes encontrados.
  - **Código 404:** No se encontraron turnos pendientes.

### 6. Obtener historial médico
- **Ruta:** `GET /api/turno/obtener/historial/:id`
- **Descripción:** Obtiene el historial médico de un usuario específico.
- **Parámetros:**
  - `id`: ID del usuario.
- **Respuesta:**
  - **Código 200:** Historial médico encontrado.
  - **Código 404:** No se encontró historial médico.

## Rutas de Usuario 👤

### 1. Obtener usuario por email
- **Ruta:** `GET /api/usuario/obtener/:email`
- **Descripción:** Obtiene los detalles de un usuario específico utilizando su dirección de correo electrónico.
- **Parámetros:**
  - `email`: Dirección de correo electrónico del usuario.
- **Middleware:**
  - `verificarAutenticacion`: Verifica que el usuario esté autenticado.
- **Respuesta:**
  - **Código 200:** Usuario encontrado con detalles.
  - **Código 404:** Usuario no encontrado.

### 2. Obtener listado de usuarios
- **Ruta:** `GET /api/usuario/obtener/usuarios/:id`
- **Descripción:** Obtiene una lista de todos los usuarios en el sistema.
- **Parámetros:**
  - `id`: ID del usuario que solicita la lista (necesario para verificar permisos).
- **Middleware:**
  - `verificarSoloAdministrador`: Asegura que solo un administrador pueda acceder a esta ruta.
  - `verificarAutenticacion`: Verifica que el usuario esté autenticado.
- **Respuesta:**
  - **Código 200:** Lista de usuarios encontrados.
  - **Código 403:** Acceso denegado (no es un administrador).
  - **Código 404:** No se encontraron usuarios.

### 3. Insertar especialidad a especialista
- **Ruta:** `POST /api/usuario/especialista/insertar/especialidad/:id`
- **Descripción:** Asocia una especialidad a un especialista existente en el sistema.
- **Parámetros:**
  - `id`: ID del especialista al que se le asignará la especialidad.
- **Middleware:**
  - `verificarAutenticacion`: Verifica que el usuario esté autenticado.
- **Cuerpo de la solicitud:**
  - **Campos requeridos:** (Define los campos que se requieren aquí, como `especialidad`, etc.)
- **Respuesta:**
  - **Código 201:** Especialidad asignada exitosamente.
  - **Código 400:** Error de validación, con detalles sobre los campos faltantes o incorrectos.

### 4. Obtener listado de especialistas
- **Ruta:** `GET /api/usuario/especialista/obtener/:especialidad?`
- **Descripción:** Obtiene una lista de especialistas, opcionalmente filtrada por una especialidad específica.
- **Parámetros:**
  - `especialidad`: (opcional) ID o nombre de la especialidad.
- **Respuesta:**
  - **Código 200:** Lista de especialistas encontrados.
  - **Código 404:** No se encontraron especialistas.

 
