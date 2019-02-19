import { LoginPage, UserPage, RepoPage, NotFoundPage } from 'pages';
import { bindActionCreators } from 'redux';
import { repoActions } from './store/modules/repo';

const routes = [
  {
    path: '/auth/login',
    component: LoginPage,
    exact: false,
  },
  {
    path: '/notfound',
    component: NotFoundPage,
    exact: false,
  },
  {
    path: '/@:username',
    component: UserPage,
    exact: true,
    preload: (store, params) => {
      const RepoActions = bindActionCreators(repoActions, store.dispatch);
      const promise1 = RepoActions.repoList({
        page: 1,
        perPage: 10,
        username: params.username,
      });
      const promise2 = RepoActions.nextRepoList({
        page: 2,
        perPage: 10,
        username: params.username,
      });
      return Promise.all([promise1, promise2]);
    },
  },
  {
    path: '/@:username/:reponame',
    component: RepoPage,
    exact: true,
    preload: (store, params) => {
      const RepoActions = bindActionCreators(repoActions, store.dispatch);
      return RepoActions.getRepo({
        username: params.username,
        reponame: params.reponame,
      });
    },
  },
];

export default routes;
