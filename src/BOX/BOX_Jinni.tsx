import { useEffect, useState } from "react";
import Image from "../WIDG/RWID_image_V00.04";
import Pic from "../ASST/images/blossom2.jpg";

function Index() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowImage(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-40 max-h-60 flex items-center overflow-hidden">
      {showImage ? (
        <Image
          src={Pic}
          alt="slider"
          className="w-full h-full"
          objectFit="cover"
          lazy
        />
      ) : (
        <div className="w-full h-full bg-light animate-pulse" />
      )}

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 
            bg-gradient-to-t from-light dark:from-[#141823] to-transparent z-10"
      ></div>
    </div>
  );
}

export default Index;
