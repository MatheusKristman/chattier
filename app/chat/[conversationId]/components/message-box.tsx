import { MoreHorizontal } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageBoxProps {
  otherMessage?: boolean;
}

export const MessageBox = ({ otherMessage }: MessageBoxProps) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row-reverse items-center justify-start group",
        {
          "flex-row": otherMessage,
        }
      )}
    >
      <div
        className={cn(
          "w-2/3 px-6 pt-6 pb-2 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-[#523BFE] xl:w-2/5",
          {
            "bg-[#131920] rounded-bl-none rounded-br-3xl": otherMessage,
          }
        )}
      >
        <p className="text-base text-white">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
          obcaecati cumque praesentium ad quas dolorum autem accusamus quae
          quasi minima perspiciatis eum doloribus hic laborum, fuga, voluptate
          architecto quibusdam unde!
        </p>

        <span className="text-white/50 text-[10px]">23:45</span>
      </div>

      {!otherMessage ? (
        <Popover>
          <PopoverTrigger className="mr-6 transition-opacity opacity-0 group-hover:opacity-100">
            <MoreHorizontal color="#FFFFFF" />
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="bg-[#212A35] border-none rounded-xl rounded-tr-none space-y-6"
          >
            <Button className="bg-[#6E80F7] hover:bg-[#6E80F7]/90 w-full text-base font-semibold">
              Editar mensagem
            </Button>

            <Button
              variant="destructive"
              className="w-full text-base font-semibold"
            >
              Apagar mensagem
            </Button>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
};
