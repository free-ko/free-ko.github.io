import React from 'react';
import { render } from '@testing-library/react';
import PageFooter from './index';

describe('PageFooter', () => {
  it('renders the author name and GitHub URL', () => {
    const author = 'John Doe';
    const githubUrl = 'https://github.com/johndoe';
    const { getByText, getByRole } = render(<PageFooter author={author} githubUrl={githubUrl} />);

    const authorLink = getByRole('link', { name: author });
    const githubLink = getByRole('link', { name: 'zoomkoding-gatsby-blog' });

    expect(authorLink).toHaveAttribute('href', githubUrl);
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/zoomKoding/zoomkoding-gatsby-blog',
    );
  });

  it('renders the current year', () => {
    const { getByText } = render(<PageFooter />);
    const currentYear = new Date().getFullYear();
    const yearText = getByText(`© ${currentYear}`);

    expect(yearText).toBeInTheDocument();
  });
});
