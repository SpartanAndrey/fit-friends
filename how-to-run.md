# Сборка backend

Перейти в папку project: cd project

Выполнить сборку каждого из микросервисов:
```bash
nx run workouts:build
nx run users:build
nx run notify:build
nx run uploader:build
nx run bff:build 
```

Выполнить docker-compose:
```bash
docker compose -f ./docker.compose.stage.yml up -d
```

# Сборка frontend

Перейти в папку project: cd frontend/proect

Выполнить сборку:
```bash
npm run build 
```

Выполнить docker-compose:
```bash
docker compose -f ./docker.compose.stage.yml up -d
```

# Ссылка на приложение
```bash
http://localhost:3000/
```