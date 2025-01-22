const Badge = ({ text, active, onClick }) => {
  return (
    <div
      className={`cursor-pointer rounded-full px-2 py-1 text-xs font-semibold ${active ? "bg-info bg-opacity-25 text-info" : "bg-gray-300 text-gray-500"}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Badge;
