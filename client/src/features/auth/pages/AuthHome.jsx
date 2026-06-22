import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { logout } from "../model/authSlice";

/* ── tiny inline SVGs so there are zero external deps ── */
const CheckCircleIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const BoltIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/* ── decorative dot-grid background (SVG pattern) ── */
const DotGrid = () => (
  <svg
    className="absolute inset-0 h-full w-full"
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
        <circle cx="1.5" cy="1.5" r="1.5" fill="#d6cfc6" fillOpacity="0.55" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

/* ── avatar placeholder (shown when no real photo) ── */
const AvatarPlaceholder = ({ initials }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold select-none">
    {initials}
  </div>
);

const AuthHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useSelector((state) => state.auth.user);

  const wasVerified = searchParams.get("verified") === "1";

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const initials = useMemo(
    () => user?.username?.slice(0, 2)?.toUpperCase() || "U",
    [user?.username],
  );

  return (
    /* ── page shell with warm cream background + dot grid ── */
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f3ee] px-4">
      <DotGrid />

      {/* ── centered card ── */}
      <div className="relative z-10 w-full max-w-[480px]">
        <div className="rounded-3xl bg-white shadow-[0_8px_48px_rgba(0,0,0,0.10)] px-8 py-10 text-center">
          {/* ── avatar + verified badge ── */}
          <div className="relative mx-auto mb-6 w-24 h-24">
            {/* orange ring */}
            <div className="absolute inset-0 rounded-full ring-4 ring-orange-400 ring-offset-2" />
            <div className="h-24 w-24 overflow-hidden rounded-full">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="h-full w-full object-cover"
                />
              ) : (
                <AvatarPlaceholder initials={initials} />
              )}
            </div>

            {/* verified pill — sits at bottom-center of avatar */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-orange-500 px-3 py-0.5 text-white text-[11px] font-semibold shadow-md whitespace-nowrap">
              <CheckCircleIcon />
              Verified
            </div>
          </div>

          {/* ── headline ── */}
          <div className="mt-6 mb-4">
            <h1 className="text-[1.65rem] font-bold leading-tight text-gray-900">
              Welcome to the future of search
            </h1>
          </div>

          {/* ── body copy ── */}
          <p className="text-sm text-gray-500 leading-relaxed max-w-[340px] mx-auto mb-8">
            {wasVerified
              ? "Your email has been successfully verified. You now have full access to Perplexity Lite's intelligent search ecosystem and library."
              : `Welcome back, ${user?.username || "there"}! Your account is active and ready to use.`}
          </p>

          {/* ── primary CTA ── */}
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold py-4 transition-colors shadow-sm mb-4"
          >
            Continue to Dashboard
            <ArrowRightIcon />
          </Link>

          {/* ── secondary link ── */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Back to Library
          </button>
        </div>

        {/* ── trust badges below card ── */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm">
            <ShieldIcon />
            Secure Account
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm">
            <BoltIcon />
            Instant Access
          </span>
        </div>
      </div>
    </main>
  );
};

export default AuthHome;
