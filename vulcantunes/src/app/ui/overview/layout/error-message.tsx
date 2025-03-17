import { ErrorMessageProps } from "@/src/app/lib/definitions";

export const ErrorMessage = ({
   title,
   message,
   error
}: ErrorMessageProps) => {
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
        {error?.message && (
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
