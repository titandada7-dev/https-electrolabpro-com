import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
          <div className="max-w-2xl w-full bg-card border border-border rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">⚠️</span>
              <h1 className="text-2xl font-bold text-foreground">
                Algo falló al cargar la app
              </h1>
            </div>
            <p className="text-muted-foreground">
              Encontramos un error inesperado. Podés recargar la página o volver al inicio.
              Si el problema persiste, copiá el detalle técnico y enviánoslo a{" "}
              <a href="mailto:contacto@electrolabpro.com" className="text-primary underline">
                contacto@electrolabpro.com
              </a>
              .
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                Recargar
              </button>
              <button
                onClick={this.handleHome}
                className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-muted transition"
              >
                Ir al inicio
              </button>
            </div>

            <details className="mt-4 bg-muted/40 rounded-md p-3 text-xs font-mono overflow-auto">
              <summary className="cursor-pointer text-foreground font-semibold mb-2">
                Detalle técnico
              </summary>
              <div className="space-y-2 text-muted-foreground">
                <div>
                  <strong className="text-foreground">Mensaje:</strong>{" "}
                  {error?.message || "Sin mensaje"}
                </div>
                {error?.stack && (
                  <pre className="whitespace-pre-wrap break-words">{error.stack}</pre>
                )}
                {errorInfo?.componentStack && (
                  <pre className="whitespace-pre-wrap break-words border-t border-border pt-2">
                    {errorInfo.componentStack}
                  </pre>
                )}
              </div>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
