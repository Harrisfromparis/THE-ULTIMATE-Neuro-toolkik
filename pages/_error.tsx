import { NextPageContext } from 'next';

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-6">
      <div className="bg-white border border-border rounded-lg shadow p-8 text-center max-w-lg">
        <h1 className="text-3xl font-bold text-textPrimary mb-2">
          {statusCode ? `Error ${statusCode}` : 'An error occurred'}
        </h1>
        <p className="text-textSecondary mb-6">
          Something went wrong. Please try refreshing the page.
        </p>
        <a href="/" className="bg-primary hover:bg-accent text-textPrimary font-medium py-2 px-4 rounded-md border border-border">
          Home
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as any).statusCode : 404;
  return { statusCode };
};

export default Error;
