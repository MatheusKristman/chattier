import { MessageBox } from "./message-box";

export const MessagesBox = () => {
  return (
    <div className="w-full flex-1 flex flex-col gap-y-6">
      <MessageBox otherMessage={true} />
      <MessageBox />
    </div>
  );
};
