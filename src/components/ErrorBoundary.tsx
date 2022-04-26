import React from 'react';
import { serializeError } from '@/lib/utils'
type State = { error: any };
type Props = { children: React.ReactNode };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state= { error: null };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error: serializeError(error) };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error}</p>
        </div>
      )
    }

    return this.props.children; 
  };
}
  
export default ErrorBoundary;