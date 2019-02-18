import React from 'react';
import UserPageContainer from 'containers/UserPageContainer';

const UserPage = ({
  match: {
    params: { username },
  },
}) => {
  return <UserPageContainer username={username} />;
};

export default UserPage;
