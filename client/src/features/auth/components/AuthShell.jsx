import { Link } from "react-router-dom";

/* Decorative dot-grid background — same pattern as AuthHome */
const DotGrid = () => (
  <svg
    className="absolute inset-0 h-full w-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id="dots"
        x="0"
        y="0"
        width="28"
        height="28"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="1.5" cy="1.5" r="1.5" fill="#c8c0b5" fillOpacity="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

/* Large faint "AI" watermark top-right (visible in Register screenshot) */

/**
 * AuthShell
 * Props:
 *   title          – page heading
 *   subtitle       – sub-heading line
 *   footerText     – plain text before the link ("Already have an account?")
 *   footerLinkText – link label ("Sign In")
 *   footerHref     – link destination
 *   showGoogle     – whether to render the "Continue with Google" button (default true)
 *   onGoogle       – click handler for Google button
 *   children       – the form fields / submit button
 */
const AuthShell = ({
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerHref,
  showGoogle = true,
  onGoogle,
  children,
}) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f2ec] px-4 py-10">
      <DotGrid />

      <div className="relative z-10 w-full max-w-[460px]">
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_6px_40px_rgba(0,0,0,0.10)] px-8 pt-10 pb-8">
       
          {/* Heading */}
          <h1 className="text-[1.65rem] font-bold text-gray-900 leading-tight">
            {title}
          </h1>
          <p className="mt-1 text-sm text-gray-400">{subtitle}</p>

          {/* Google OAuth button */}
          {showGoogle && (
            <>
              <button
                type="button"
                onClick={onGoogle}
                className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                {/* Google "G" logo */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M47.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.2z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.5 0 12-2.2 16-5.8l-7.9-6c-2.2 1.5-5 2.3-8.1 2.3-6.2 0-11.5-4.2-13.4-9.9H2.4v6.2C6.4 42.5 14.6 48 24 48z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.6 28.6A14.7 14.7 0 0 1 9.8 24c0-1.6.3-3.1.8-4.6v-6.2H2.4A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.4 10.8l8.2-6.2z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.2 30.4 0 24 0 14.6 0 6.4 5.5 2.4 13.2l8.2 6.2C12.5 13.7 17.8 9.5 24 9.5z"
                  />
                </svg>
                Continue with Google
              </button>

              <div className="relative my-5 flex items-center">
                <div className="flex-1 border-t border-gray-100" />
                <span className="mx-3 text-xs text-gray-400 font-medium tracking-wide">
                  OR EMAIL
                </span>
                <div className="flex-1 border-t border-gray-100" />
              </div>
            </>
          )}

          {/* Slot for form fields + submit */}
          {children}
        </div>

        {/* Footer links */}
        <p className="mt-5 text-center text-sm text-gray-500">
          {footerText}{" "}
          <Link
            to={footerHref}
            className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            {footerLinkText}
          </Link>
        </p>

        {/* Legal */}
        <div className="mt-4 flex justify-center gap-5">
          <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Privacy Policy
          </button>
          <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Terms of Service
          </button>
        </div>
      </div>
    </main>
  );
};

export default AuthShell;
