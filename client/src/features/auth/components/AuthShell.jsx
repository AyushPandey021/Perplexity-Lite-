import { Link } from "react-router-dom";

const AuthShell = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerHref,
}) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 py-10 text-slate-950">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-cyan-500 text-lg font-bold text-white">
            P
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
            Perplexity Lite
          </p>
        </div>

        <div className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-950">
            {title}
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-slate-500">
            {subtitle}
          </p>

          {children}
        </div>

        <p className="mt-6 text-center text-sm text-slate-600">
          {footerText}{" "}
          <Link
            className="font-semibold text-cyan-600 underline-offset-4 hover:text-cyan-700 hover:underline"
            to={footerHref}
          >
            {footerLinkText}
          </Link>
        </p>
      </section>
    </main>
  );
};

export default AuthShell;
