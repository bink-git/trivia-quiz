import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
  return (
    <div className="flex  items-center justify-center">
      <FadeLoader
        color="#ffffff"
        radius={2}
        width={5}
        height={20}
        margin={10}
      />
    </div>
  );
};

export default Loader;
