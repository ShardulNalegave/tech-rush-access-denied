/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as ProfileImport } from './routes/profile'
import { Route as PortofolioImport } from './routes/portofolio'
import { Route as LoginImport } from './routes/login'
import { Route as FeedImport } from './routes/feed'
import { Route as EditprofileImport } from './routes/edit_profile'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const PortofolioRoute = PortofolioImport.update({
  path: '/portofolio',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const FeedRoute = FeedImport.update({
  path: '/feed',
  getParentRoute: () => rootRoute,
} as any)

const EditprofileRoute = EditprofileImport.update({
  path: '/edit_profile',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
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
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/edit_profile': {
      id: '/edit_profile'
      path: '/edit_profile'
      fullPath: '/edit_profile'
      preLoaderRoute: typeof EditprofileImport
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
    '/portofolio': {
      id: '/portofolio'
      path: '/portofolio'
      fullPath: '/portofolio'
      preLoaderRoute: typeof PortofolioImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AboutRoute,
  EditprofileRoute,
  FeedRoute,
  LoginRoute,
  PortofolioRoute,
  ProfileRoute,
  SignupRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/about",
        "/edit_profile",
        "/feed",
        "/login",
        "/portofolio",
        "/profile",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/about": {
      "filePath": "about.jsx"
    },
    "/edit_profile": {
      "filePath": "edit_profile.jsx"
    },
    "/feed": {
      "filePath": "feed.jsx"
    },
    "/login": {
      "filePath": "login.jsx"
    },
    "/portofolio": {
      "filePath": "portofolio.jsx"
    },
    "/profile": {
      "filePath": "profile.jsx"
    },
    "/signup": {
      "filePath": "signup.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
