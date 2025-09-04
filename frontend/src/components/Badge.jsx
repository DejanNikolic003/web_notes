const BADGE_TYPES = {
  danger: "bg-red-500 text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-400 text-black",
  info: "bg-blue-500 text-white",
};

const Badge = ({ text, badgeType = "info" }) => {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${BADGE_TYPES[badgeType]}`}
    >
      {text}
    </span>
  );
};

export default Badge;
