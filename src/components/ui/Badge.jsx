const Badge = ({ text, active, onClick }) => {
  return (
    <div
      className={`cursor-pointer rounded-full px-2 py-1 text-xs font-semibold ${active ? "bg-info bg-opacity-20 text-info" : "bg-gray-200 text-gray-500"}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Badge;
