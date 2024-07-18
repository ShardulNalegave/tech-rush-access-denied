/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as ProfileImport } from './routes/profile'
import { Route as LoginImport } from './routes/login'
<<<<<<< Updated upstream
import { Route as FeedImport } from './routes/feed'
=======
import { Route as EditprofileImport } from './routes/edit_profile'
>>>>>>> Stashed changes
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

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

<<<<<<< Updated upstream
const FeedRoute = FeedImport.update({
  path: '/feed',
=======
const EditprofileRoute = EditprofileImport.update({
  path: '/edit_profile',
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    '/feed': {
      id: '/feed'
      path: '/feed'
      fullPath: '/feed'
      preLoaderRoute: typeof FeedImport
=======
    '/edit_profile': {
      id: '/edit_profile'
      path: '/edit_profile'
      fullPath: '/edit_profile'
      preLoaderRoute: typeof EditprofileImport
>>>>>>> Stashed changes
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
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
<<<<<<< Updated upstream
  FeedRoute,
=======
  EditprofileRoute,
>>>>>>> Stashed changes
  LoginRoute,
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
<<<<<<< Updated upstream
        "/feed",
=======
        "/edit_profile",
>>>>>>> Stashed changes
        "/login",
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
<<<<<<< Updated upstream
    "/feed": {
      "filePath": "feed.jsx"
=======
    "/edit_profile": {
      "filePath": "edit_profile.jsx"
>>>>>>> Stashed changes
    },
    "/login": {
      "filePath": "login.jsx"
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
