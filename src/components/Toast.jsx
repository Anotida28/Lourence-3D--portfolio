const ICONS = {
  success: "✓",
  error: "✕",
};

const Toast = ({ status, message, onClose }) => {
  if (!status) return null;

  return (
    <div className="toast-wrapper" role="status" aria-live="polite">
      <div className={`toast toast-${status}`}>
        <span className="toast-icon">{ICONS[status]}</span>
        <p className="toast-message">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="toast-close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
