# Node + Express TypeScript Boilerplate

A robust starter template for building scalable REST APIs using Node.js, Express.js, and TypeScript. This boilerplate is designed for rapid development, best practices, and easy deployment. It includes essential features and a modular structure to help you kickstart your next backend project.

## Features

- **TypeScript** for type safety and modern JavaScript features
- **Express.js** for fast, unopinionated web framework
- **Modular folder structure** for scalability
- **Environment-based configuration**
- **Centralized error handling**
- **Request logging, rate limiting, and XSS protection**
- **User authentication module**
- **Ready for cloud deployment**

## Folder Structure

```
└── 📁src
    └── 📁config
        └── env.ts
        └── index.ts
    └── 📁constants
        └── index.ts
    └── 📁database
        └── datasource.ts
        └── index.ts
    └── 📁middlewares
        └── errorHandler.ts
        └── rateLimiter.ts
        └── requestLogger.ts
        └── xssSanitizer.ts
    └── 📁modules
        └── 📁user
            └── user.controller.ts
            └── user.dto.ts
            └── user.entity.ts
            └── user.repository.ts
            └── user.route.ts
            └── user.service.ts
            ....
    └── 📁providers
        └── 📁firebase
            └── firebase.ts
        └── index.ts
    └── 📁router
        └── index.ts
        └── v1.ts
    └── 📁utils
        └── context.ts
        └── error.ts
        └── helpers.ts
        └── logger.ts
        └── response.ts
    └── app.ts
    └── index.ts
```

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run the development server:**

   ```sh
   npm run dev
   ```

   The server will start automatically. By default, it listens on the port specified in your environment variables.

3. **Build for production:**

   ```sh
   npm run build
   ```

4. **Start the production server:**
   ```sh
   npm start
   ```

## Environment Variables

Copy `.env.example` to `.env` and update the values as needed for your environment.
