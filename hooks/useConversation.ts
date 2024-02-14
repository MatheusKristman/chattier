import { useMemo } from "react";

const useConversation = (params: { conversationId?: string } | undefined) => {
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  console.log("params", params);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId],
  );
};

export default useConversation;
