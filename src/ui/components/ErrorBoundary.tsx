import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // Esto permite cualquier contenido dentro del ErrorBoundary
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Puedes agregar aquí la lógica para registrar el error
    console.error("Error capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes personalizar la presentación de un error aquí
      return (
        <div>
          <h1>¡Ha ocurrido un error!</h1>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
