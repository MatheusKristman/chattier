import { X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  boxModalAnimation,
  containerModalAnimation,
} from "@/constants/framer-animation/modal-animation";

interface ImageModalProps {
  fileUrl: string | null;
  isImageModalOpen: boolean;
  closeModal: () => void;
}

export const ImageModal = ({
  fileUrl,
  isImageModalOpen,
  closeModal,
}: ImageModalProps) => {
  return (
    <AnimatePresence>
      {isImageModalOpen && fileUrl ? (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerModalAnimation}
          className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            variants={boxModalAnimation}
            className="relative w-full h-[700px] max-w-[700px] bg-[#202730] rounded-[30px] overflow-hidden inline-block align-middle"
          >
            <Button
              onClick={closeModal}
              variant="link"
              className="absolute right-6 top-6 z-10 bg-white px-2 rounded-full w-[40px] h-p[40px] p-1 hover:bg-white/80"
            >
              <X size="30px" strokeWidth="1.5" color="#202730" />
            </Button>

            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
              <Image
                src={fileUrl}
                alt="Nova foto de perfil"
                fill
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
