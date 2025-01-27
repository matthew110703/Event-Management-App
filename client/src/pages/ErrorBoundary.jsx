import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
          <p>Sorry about that. Please Try again Later</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
