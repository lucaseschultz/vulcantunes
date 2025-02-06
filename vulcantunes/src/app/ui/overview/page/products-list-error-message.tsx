import { ProductsListErrorMessageProps } from "@/src/app/lib/definitions";

export const ProductsListErrorMessage = ({
   title,
   message,
   error,
   errorType
 }: ProductsListErrorMessageProps) => {
  return (
    <div
      className="error-container"
      role="alert"
      data-testid="error-boundary"
    >
      <h3 className="error-title">
        {title}
      </h3>
      <div className="error-content">
        <div className="error-message">
          {message}
        </div>
        {error?.message && errorType !== 'network' && (
          <div className="error-details">
            {error.message}
          </div>
        )}
      </div>
      <button
        onClick={() => window.location.reload()}
        className="error-button"
        aria-label="Refresh"
        type="button"
      >
        Refresh
      </button>
    </div>
  );
};
