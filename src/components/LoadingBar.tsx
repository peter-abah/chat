const LoadingBar = ({ overlay }: { overlay?: boolean }) => {
  return (
    <>
      <div
        className="h-1 fixed top-0 left-0 z-50 bg-primary animate-bar w-0"
      />
      {overlay && <div 
        className='fixed top-0 left-0 w-screen h-screen bg-black/10 z-40' 
      />}
    </>
  );
};

export default LoadingBar;