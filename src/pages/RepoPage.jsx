import React from 'react';
import RepoContainer from 'containers/RepoContainer';

const RepoPage = ({
  match: {
    params: { username, reponame },
  },
}) => {
  return <RepoContainer username={username} reponame={reponame} />;
};

export default RepoPage;
