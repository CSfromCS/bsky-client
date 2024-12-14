import error2json from '@stdlib/error-to-json';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
            <div className="max-w-md w-full px-6 py-8 bg-zinc-200 dark:bg-zinc-900 shadow-lg rounded-lg">
              <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h1>
              <pre className="text-gray-600 dark:text-gray-300 mb-4">
                {this.state.error
                  ? JSON.stringify(error2json(this.state.error), null, 2)
                      .split('\n')
                      .map((item) => (
                        <>
                          {item}
                          <br />
                        </>
                      ))
                  : 'An unexpected error occurred'}
              </pre>
              <button
                // reload the component
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reload component
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
