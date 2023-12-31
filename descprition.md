# FitFriends

FitFriends — это онлайн площадка для поиска тренировок и их создания. Веб-приложение (сайт) функционирует как смесь соцсети и биржи объявлений. Тренеры создают тренировки, а пользователи могут покупать их и заниматься по ним, приглашать других пользователей на совместные тренировки, а тренеров просить провести индивидуальную тренировку.

## Сценарии

В `package.json` предопределено несколько сценариев.

### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

### Запустить проект

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

## Структура проекта

### Микросервис bff

Предоставляет единый RESTAPI для фронтенда.

#### Запуск микросервиса

```bash
nx run bff:serve
```

### Микросервис Users

Отвечает за регистрацию, авторизацию, просмотр, добавление друзей, управление балансом и персональными тренировками пользователей.

#### Запуск микросервиса

```bash
nx run users:serve
```

#### Развёртывание БД с помощью Docker

```bash
docker compose --file ./apps/users/docker-compose.dev.yml --project-name "fitfriends-users" up -d
```

#### Спецификация

```bash
http://localhost:3000/spec
```

### Микросервис Workouts

Отвечает создание, редактирование и просмотр тренировок, заказов и отзывов.

#### Запуск микросервиса

```bash
nx run workouts:serve
```

#### Развёртывание БД с помощью Docker

```bash
docker compose --file ./apps/workouts/docker-compose.dev.yml --project-name "fitfriends-workouts" up -d
```

#### Заполнение БД моковыми данными

```bash
nx run workouts:db:seed
```

#### Спецификация

```bash
http://localhost:3100/spec
```

### Микросервис Notify

Отвечает за рассылку почтовых уведомлений.

#### Запуск микросервиса

```bash
nx run notify:serve
```

#### Развёртывание БД с помощью Docker

```bash
docker compose --file ./apps/notify/docker-compose.dev.yml --project-name "fitfriends-notify" up -d
```

### Микросервис Uploader

Отвечает за загрузку файлов.

#### Запуск микросервиса

```bash
nx run uploader:serve
```

#### Развёртывание БД с помощью Docker

```bash
docker compose --file ./apps/uploader/docker-compose.dev.yml --project-name "fitfriends-uploader" up -d
```
