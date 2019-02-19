import React from 'react';
import NotFoundContainer from 'containers/NotFoundContainer';
import StructureContainer from 'containers/StructureContainer';

const NotFoundPage = ({ staticContext }) => {
  if (staticContext) {
    staticContext.isNotFound = true;
  }
  return (<StructureContainer>
            <NotFoundContainer />
          </StructureContainer>);
};

export default NotFoundPage;
