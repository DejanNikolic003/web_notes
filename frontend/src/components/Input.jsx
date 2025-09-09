const Input = ({ name, type, placeholder, register, validationRules = {} }) => {
	return (
		<input
			name={name}
			type={type}
			placeholder={placeholder}
			className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none ring-0 transition focus:border-slate-500 focus:ring-2 focus:ring-sky-500/40"
			{...register(name, validationRules)}
		/>
	);
};
export default Input;
