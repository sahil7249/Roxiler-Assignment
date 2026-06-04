export const Input = ({ label, error, id, className = "", ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label
        htmlFor={id}
        className="text-xs font-medium text-slate-600 uppercase tracking-wide"
      >
        {label}
      </label>
    )}
    <input
      id={id}
      className={`w-full px-3 py-2 text-sm border rounded bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition 
                ${error ? "border-red-400 focus:ring-slate-400 " : "border-slate-300"}
                ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm" };
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-700 focus:ring-slate-500",
    secondary:
      "bg-white text-slate-900 border border-slate-300 hover:bg-slate-100 focus:ring-slate-400",
    ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-300",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Alert = ({ message, type = "error" }) => (
  <div
    className={`text-sm px-4 py-3 rounded border ${type === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"}`}
  >
    {message}
  </div>
);

export const Select = ({ label, error, id, options, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label htmlFor={id} className="text-xs font-medium text-slate-600 uppercase tracking-wide">{label}</label>}
    <select
      id={id}
      className={`w-full px-3 py-2 text-sm border rounded bg-white text-slate-900
        focus:outline-none focus:ring-2 focus:ring-slate-400 transition
        ${error ? 'border-red-400' : 'border-slate-300'} ${className}`}
      {...props}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export const NavBar = ({ userName ,role ,onLogOut,links}) => {
    return <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-6">
      <span className="font-bold text-slate-900 tracking-tight">RateStore</span>
      {links?.map(l => (
        <button  key={l.label} onClick={l.onClick} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">{l.label}</button>
      ))}
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-medium text-slate-900">{userName}</p>
        <p className="text-xs text-slate-500 capitalize">{role}</p>
      </div>
      <Button variant="ghost" size="sm" onClick={onLogOut}>Logout</Button>
    </div>
  </nav>
}

export const PageWrapper = ({ title, children, action }) => (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {action}
      </div>
      {children}
    </div>
  </div>
);

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`}>{children}</div>
);

export const StatCard = ({ label, value }) => (
  <Card className="p-6">
    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
  </Card>
);
