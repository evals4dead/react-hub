import React from 'react';
import UserPageContainer from 'containers/UserPageContainer';
import StructureContainer from 'containers/StructureContainer';

const UserPage = ({
  match: {
    params: { username },
  },
}) => {
  return (<StructureContainer><UserPageContainer username={username} /></StructureContainer>)
};

export default UserPage;
