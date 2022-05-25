# Remix Starter

Basic starter kit that includes Auth0 and Tailwind CSS

- [Remix Docs](https://remix.run/docs)

## 👉 Get Started

The application follows a typical [Remix](https://remix.run/docs/en/v1/tutorials/blog) folder structure. You can find the entry point the web application in the `app` directory.

You'll notice that the Remix routes are just thin wrappers and most of the heavy lifting code is done in the `/models` directory.

```
├── /app                     # Web client
    ├── /models              # Feature source code (most of the logic lives here)
    ├── /routes              # Remix file sytem routes
    └── /styles              # Global styles
└── /public                  # Static assets
```

### Install dependencies

- [Node.js](https://nodejs.org/en/) - LTS version recommended

### Local Development

```sh
# Copy .env.example to .env and update variables
cp .env.example .env

# Installing dependencies
npm install

# To start the apps
npm run dev # or npm run dev:api && npm run dev:web if you'd like to run them independently
```

This will start the [Remix](https://remix.run) development server. When the above command completes you'll be able to view your website at `http://localhost:3000`
