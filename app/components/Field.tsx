/*
 * Form-field primitive shared by the lead form. Owns label spacing
 * and the "Optional" pill so individual inputs stay terse.
 */
export function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between text-sm font-medium tracking-tight text-slate-900"
      >
        {label}
        {optional && (
          <span className="text-xs font-normal text-stone-400">Optional</span>
        )}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full rounded-sm border border-stone-200 bg-stone-50 px-4 py-3 text-base text-slate-900 placeholder:text-stone-400 transition-all duration-300 outline-none hover:border-stone-300 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/15";

export const selectClass = `${inputClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20d%3D%27M5%208l5%205%205-5%27%20stroke%3D%27%237d756a%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat pr-12`;
