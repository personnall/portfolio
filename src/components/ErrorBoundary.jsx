import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("OS Exception Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-pink-500/20 text-pink-500 rounded-2xl flex items-center justify-center mb-8 border border-pink-500/50 shadow-neon-pink">
             <span className="text-4xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Kernel Panic</h1>
          <p className="text-white/40 max-w-md mb-8">The system encountered an unrecoverable error in this module. A reboot may be required.</p>
          <button
            onClick={() => window.location.reload()}
            className="cyber-button"
          >
            Hot Reload System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
