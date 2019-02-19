import React from 'react';
import RepoContainer from 'containers/RepoContainer';
import StructureContainer from 'containers/StructureContainer';

const RepoPage = ({
  match: {
    params: { username, reponame },
  },
}) => {
  return (<StructureContainer>
            <RepoContainer username={username} reponame={reponame} />
          </StructureContainer>);
};

export default RepoPage;
