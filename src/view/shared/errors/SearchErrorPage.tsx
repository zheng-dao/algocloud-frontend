import React from 'react';
import { Link } from 'react-router-dom';
import ErrorWrapper from 'src/view/shared/errors/styles/ErrorWrapper';
import { i18n } from 'src/i18n';

const SearchErrorPage = () => {
  return (
    <ErrorWrapper>
      <div className="exception">
        <div className="imgBlock">
          <div
            className="imgEle"
            style={{
              backgroundImage: `url(/images/404.svg)`,
            }}
          />
        </div>
        <div className="content">
          <h1>No matching items were found</h1>
          <div className="desc">{i18n('errors.404')}</div>
          <div className="actions">
            <Link to="/">
              <button
                className="btn btn-primary"
                type="button"
              >
                {i18n('errors.backToHome')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ErrorWrapper>
  );
};

export default SearchErrorPage;
