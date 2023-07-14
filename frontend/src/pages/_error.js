import React from "react";
import Router from "next/router";

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      {statusCode ? (
        // <p>An error {statusCode} occurred on server</p>
        <section>
          <div class="bg-black text-white">
            <div class="flex h-screen">
              <div class="m-auto text-center">
                <div>
                </div>
                <p class="text-sm md:text-base text-primary-300 p-2 mb-4">
                  The stuff you were looking for doesn't exist
                </p>
                <a
                  onClick={() => Router.back()}
                  class="bg-transparent hover:bg-primary-300 text-primary-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-primary-300 hover:border-transparent"
                >
                  Retry
                </a>
              </div>
            </div>
          </div>
        </section>
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
