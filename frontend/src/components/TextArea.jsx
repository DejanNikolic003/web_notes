const TextArea = ({ name, placeholder, register, validationRules = {} }) => {
	return (
		<textarea
			rows="5"
			cols="5"
			placeholder={placeholder}
			name={name}
			className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-400 outline-none ring-0 transition focus:border-slate-500 focus:ring-2 focus:ring-sky-500/40"
			{...register(name, validationRules)}
		></textarea>
	);
};
export default TextArea;
