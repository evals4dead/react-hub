import asyncComponent from 'lib/asyncComponent';

export const LoginPage = asyncComponent(() => import('./LoginPage'));
export const RepoPage = asyncComponent(() => import('./RepoPage'));
export const UserPage = asyncComponent(() => import('./UserPage'));
export const NotFoundPage = asyncComponent(() => import('./NotFoundPage'));
