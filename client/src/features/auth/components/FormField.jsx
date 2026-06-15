const FormField = ({ label, id, error, ...props }) => {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-slate-800">
        {label}
      </span>
      <input
        id={id}
        className={`h-12 w-full rounded-[8px] border bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/15 ${
          error ? "border-rose-400" : "border-slate-200"
        }`}
        {...props}
      />
      {error ? (
        <span className="mt-2 block text-sm text-rose-600">{error}</span>
      ) : null}
    </label>
  );
};

export default FormField;
