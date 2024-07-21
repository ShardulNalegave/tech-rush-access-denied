/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FeedImport } from './routes/feed'
import { Route as IndexImport } from './routes/index'
import { Route as ProfileEditImport } from './routes/profile.edit'
import { Route as ProfileUserIDImport } from './routes/profile.$userID'
import { Route as PostsCreateImport } from './routes/posts.create'
import { Route as PostsPostIDImport } from './routes/posts.$postID'
import { Route as PortfolioUserIDImport } from './routes/portfolio.$userID'
import { Route as AuthSignupImport } from './routes/auth.signup'
import { Route as AuthLoginImport } from './routes/auth.login'

// Create/Update Routes

const FeedRoute = FeedImport.update({
  path: '/feed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileEditRoute = ProfileEditImport.update({
  path: '/profile/edit',
  getParentRoute: () => rootRoute,
} as any)

const ProfileUserIDRoute = ProfileUserIDImport.update({
  path: '/profile/$userID',
  getParentRoute: () => rootRoute,
} as any)

const PostsCreateRoute = PostsCreateImport.update({
  path: '/posts/create',
  getParentRoute: () => rootRoute,
} as any)

const PostsPostIDRoute = PostsPostIDImport.update({
  path: '/posts/$postID',
  getParentRoute: () => rootRoute,
} as any)

const PortfolioUserIDRoute = PortfolioUserIDImport.update({
  path: '/portfolio/$userID',
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
    '/portfolio/$userID': {
      id: '/portfolio/$userID'
      path: '/portfolio/$userID'
      fullPath: '/portfolio/$userID'
      preLoaderRoute: typeof PortfolioUserIDImport
      parentRoute: typeof rootRoute
    }
    '/posts/$postID': {
      id: '/posts/$postID'
      path: '/posts/$postID'
      fullPath: '/posts/$postID'
      preLoaderRoute: typeof PostsPostIDImport
      parentRoute: typeof rootRoute
    }
    '/posts/create': {
      id: '/posts/create'
      path: '/posts/create'
      fullPath: '/posts/create'
      preLoaderRoute: typeof PostsCreateImport
      parentRoute: typeof rootRoute
    }
    '/profile/$userID': {
      id: '/profile/$userID'
      path: '/profile/$userID'
      fullPath: '/profile/$userID'
      preLoaderRoute: typeof ProfileUserIDImport
      parentRoute: typeof rootRoute
    }
    '/profile/edit': {
      id: '/profile/edit'
      path: '/profile/edit'
      fullPath: '/profile/edit'
      preLoaderRoute: typeof ProfileEditImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  FeedRoute,
  AuthLoginRoute,
  AuthSignupRoute,
  PortfolioUserIDRoute,
  PostsPostIDRoute,
  PostsCreateRoute,
  ProfileUserIDRoute,
  ProfileEditRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/feed",
        "/auth/login",
        "/auth/signup",
        "/portfolio/$userID",
        "/posts/$postID",
        "/posts/create",
        "/profile/$userID",
        "/profile/edit"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/feed": {
      "filePath": "feed.tsx"
    },
    "/auth/login": {
      "filePath": "auth.login.tsx"
    },
    "/auth/signup": {
      "filePath": "auth.signup.tsx"
    },
    "/portfolio/$userID": {
      "filePath": "portfolio.$userID.tsx"
    },
    "/posts/$postID": {
      "filePath": "posts.$postID.tsx"
    },
    "/posts/create": {
      "filePath": "posts.create.tsx"
    },
    "/profile/$userID": {
      "filePath": "profile.$userID.tsx"
    },
    "/profile/edit": {
      "filePath": "profile.edit.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
