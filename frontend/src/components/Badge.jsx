const BADGE_TYPES = {
	danger: "bg-red-500/20 text-red-300 ring-1 ring-inset ring-red-400/30",
	success: "bg-emerald-500/20 text-emerald-300 ring-1 ring-inset ring-emerald-400/30",
	warning: "bg-amber-400/20 text-amber-300 ring-1 ring-inset ring-amber-300/30",
	info: "bg-sky-500/20 text-sky-300 ring-1 ring-inset ring-sky-400/30",
};

const Badge = ({ text, badgeType = "info" }) => {
	return (
		<span
			className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${BADGE_TYPES[badgeType]}`}
		>
			{text}
		</span>
	);
};

export default Badge;
