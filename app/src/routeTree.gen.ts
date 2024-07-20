/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TestfeedImport } from './routes/test_feed'
import { Route as TestImport } from './routes/test'
import { Route as PortfolioImport } from './routes/portfolio'
import { Route as FeedImport } from './routes/feed'
import { Route as IndexImport } from './routes/index'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as ProfileEditImport } from './routes/profile/edit'
import { Route as AuthSignupImport } from './routes/auth/signup'
import { Route as AuthLoginImport } from './routes/auth/login'

// Create/Update Routes

const TestfeedRoute = TestfeedImport.update({
  path: '/test_feed',
  getParentRoute: () => rootRoute,
} as any)

const TestRoute = TestImport.update({
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const PortfolioRoute = PortfolioImport.update({
  path: '/portfolio',
  getParentRoute: () => rootRoute,
} as any)

const FeedRoute = FeedImport.update({
  path: '/feed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIndexRoute = ProfileIndexImport.update({
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileEditRoute = ProfileEditImport.update({
  path: '/profile/edit',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  path: '/auth/signup',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/feed': {
      id: '/feed'
      path: '/feed'
      fullPath: '/feed'
      preLoaderRoute: typeof FeedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof rootRoute
    }
    '/profile/edit': {
      id: '/profile/edit'
      path: '/profile/edit'
      fullPath: '/profile/edit'
      preLoaderRoute: typeof ProfileEditImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/test_feed': {
      id: '/test_feed'
      path: '/test_feed'
      fullPath: '/test_feed'
      preLoaderRoute: typeof TestfeedImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/signup': {
      id: '/auth/signup'
      path: '/auth/signup'
      fullPath: '/auth/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof rootRoute
    }
    '/profile/edit': {
      id: '/profile/edit'
      path: '/profile/edit'
      fullPath: '/profile/edit'
      preLoaderRoute: typeof ProfileEditImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  FeedRoute,
  PortfolioRoute,
  TestRoute,
  TestfeedRoute,
  AuthLoginRoute,
  AuthSignupRoute,
  ProfileEditRoute,
  ProfileIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/feed",
        "/portfolio",
        "/test",
        "/test_feed",
        "/auth/login",
        "/auth/signup",
        "/profile/edit",
        "/profile/"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/feed": {
      "filePath": "feed.jsx"
    },
    "/portfolio": {
      "filePath": "portfolio.jsx"
    },
    "/test": {
      "filePath": "test.jsx"
    },
    "/test_feed": {
      "filePath": "test_feed.jsx"
    },
    "/auth/login": {
      "filePath": "auth/login.jsx"
    },
    "/auth/signup": {
      "filePath": "auth/signup.jsx"
    },
    "/profile/edit": {
      "filePath": "profile/edit.jsx"
    },
    "/profile/": {
      "filePath": "profile/index.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
