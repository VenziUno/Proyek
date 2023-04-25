import React from 'react';

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      {statusCode ? (
        <p>An error {statusCode} occurred on server</p>
      ) : (
        <p>An error occurred on client</p>
      )}
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;