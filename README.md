# IClimbed

🌐 [https://i-climbed.vercel.app/](https://i-climbed.vercel.app/)

[Allclimb](https://i-climbed.vercel.app/) - популярный скалолазный гайдбук, с информацией о трассах и векторными canvas маршрутами на фотографиях скал и боулдеров. 


## О проекте
I Climbed проект создан для скалолазов, которые хотят фиксировать свои пролазы и делиться ими, создавая персонализированные открытки с маршрутом и собственным текстом.<br />


## Функциональность

- ✅ **Поиск трасс** по названию или навигация через каталог (регионы → места → сектора → трассы).
- 📥 **Автоматическая загрузка данных** — регионы, секторы, трассы и их описание парсятся с Allclimb и сохраняются в PostgreSQL.
- 🖼️ **Генерация изображений маршрутов** — при открытии страницы трассы приложение запускает Playwright, переходит на Allclimb и делает скриншот скалы с наложенной canvas-линией маршрута.
- 🎉 **Открытки пролаза** — пользователь может добавить свой текст (например, «Я флешнул! 25.07.2025») на изображение маршрута и скачать его как картинку.
- 🔌 **Микрофронтенд архитектура** — используется Module Federation для компоненты [i-climbed-card](https://github.com/sKondoR/i-climbed-card).


## Микрофронтенд

Проект реализован с использованием **Module Federation** (Webpack). <br>
микрофронтенд [i-climbed-card](https://github.com/sKondoR/i-climbed-card) задеплоен на vercel [https://i-climbed-card.vercel.app/](https://i-climbed-card.vercel.app/)


### Ограничения и решения

- 🚫 **App Router (Next.js 15+)** пока не поддерживается Module Federation.
- 🔧 Решение: переход на **Pages Router**, понижение версии до **Next.js 15** и ручная настройка **Webpack** вместо Turbopack.
- ⚙️ Для сборки требуется переменная окружения: NEXT_PRIVATE_LOCAL_WEBPACK=true


## Стэк
NextJS, React, Tanstack React Query, Drizzle ORM, TailwindCSS, Playwright

## SonarQube (local)
- install: npm install -g sonar-scanner
- install java: winget install EclipseAdoptium.Temurin.21.JDK
- run on docker: docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube:latest
- set SONAR_TOKEN in .env
- run: .\scan.ps1
