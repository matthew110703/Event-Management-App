import Navbar from "./Navbar";
import Footer from "./Footer";

const Container = ({ children }) => {
  return (
    <>
      <div className="container mx-auto space-y-4 p-4 md:space-y-8">
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Container;
