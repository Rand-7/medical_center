
import { useEffect } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";

const LoadingPage = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); 
    }, 5000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"#6ca8e4",
      zIndex: 9999,
      position: "fixed",
      top: 0,
      left: 0,
    }}>
      <Lottie animationData={loaderAnimation} loop={true} />
    </div>
  );
};

export default LoadingPage;
