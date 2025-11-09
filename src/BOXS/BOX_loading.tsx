import React from "react";

// Simple, clean gray spinner with larger, elegant typography and proper spinning animation.
export default function BOX_loading({ size = 64, text = 'Loading…' }) {
  const px = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ background: 'white' }}>
      <div className="flex flex-col items-center" style={{ gap: '8px' }}>
        {/* Top text */}
        <div className="loading-title" aria-hidden>{text}</div>

        {/* Spinner */}
        <div
          role="status"
          aria-label={text}
          style={{ width: px, height: px }}
          className="simple-spinner"
        />

        {/* Bottom text */}
        <div className="loading-sub" aria-hidden>Please wait</div>
      </div>

      <style>{`
        .loading-title {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-size: 18px;
          font-weight: 600;
          color: #374151;
        }

        .loading-sub {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-size: 13px;
          color: #6b7280;
        }

        .simple-spinner {
          border-radius: 50%;
          border: 6px solid #f3f4f6;
          border-top-color: #c7c9ce;
          box-sizing: border-box;
          animation: spin 0.85s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 420px) {
          .loading-title { font-size: 16px; }
          .loading-sub { font-size: 12px; }
          .simple-spinner { border-width: 5px; }
        }
      `}</style>
    </div>
  );
}