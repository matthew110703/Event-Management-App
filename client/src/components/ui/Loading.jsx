const Loading = ({ size }) => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center h-${size}`}
    >
      <span className="loading loading-dots"></span>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
