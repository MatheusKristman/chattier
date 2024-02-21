import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-primary/50 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
      <div className="w-full inline-block align-middle">
        <div className="w-full flex flex-col items-center justify-center">
          <Loader2
            size="30px"
            color="#425061"
            className="w-20 h-20 animate-spin"
          />
          <span className="text-2xl text-center text-[#425061] font-semibold">
            Carregando...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
