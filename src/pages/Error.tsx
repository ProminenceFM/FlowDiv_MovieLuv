import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

const Error = () => {
    const error = useRouteError();

  let message = "Something went wrong.";
  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-darkblue text-white text-center px-6">
    <h1 className="text-6xl font-bold text-amber-500 mb-4">Oops!</h1>
    <p className="text-xl mb-4">{message}</p>
    <p className="mb-8">The page you're looking for doesn't exist or an unexpected error occurred.</p>
    <Link to="/" className="px-6 py-2 border-2 border-lime-50 text-lime-50 cursor-pointer hover:text-darkblue font-semibold  hover:bg-cyan-50 shadow transition">
      Go to Homepage
    </Link>
  </div>
  )
}

export default Error