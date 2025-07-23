import Pic from "../ASST/images/blossom2.jpg"
function Index() {
  return (
    <div className="relative w-full h-40 flex items-center" style={{overflow:"hidden"}}>
        <img src={Pic} alt="slider" className="w-full h-full object-cover" />
         <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 
            bg-gradient-to-t from-white to-transparent dark:from-stone-900 z-10"></div>
      </div>
  );
}

export default Index;
