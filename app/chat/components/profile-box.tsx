"use client";

import { UserRound } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import useContactStore from "@/stores/use-contact-store";
import { Skeleton } from "@/components/ui/skeleton";
import useDefaultUserColor from "@/hooks/useDefaultUserColor";
import { BlockedUserWithProfileBlocked, ProfileBoxType } from "@/types";
import { ProfileModal } from "./profile-modal";
import { BlockedUser } from "@prisma/client";

interface ProfileBoxProps {
  blockedUsers: BlockedUserWithProfileBlocked[];
}

export const ProfileBox = ({ blockedUsers }: ProfileBoxProps) => {
  const { openProfileModal } = useContactStore();
  const randomColor = useDefaultUserColor();

  const [currentUser, setCurrentUser] = useState<ProfileBoxType | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsProfileLoading(true);

    axios
      .get("/api/profile/get")
      .then((res) => setCurrentUser(res.data))
      .catch((error) => console.error(error))
      .finally(() => setIsProfileLoading(false));
  }, [setCurrentUser]);

  if (isProfileLoading) {
    return <SkeletonProfileBox />;
  }

  return (
    <>
      <ProfileModal
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        blockedUsers={blockedUsers}
      />
      <div
        onClick={openProfileModal}
        role="button"
        className="p-5 flex items-center justify-between gap-x-6 rounded-xl bg-gray-primary mx-6 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-none lg:w-auto lg:mx-6"
      >
        <div className="flex items-center justify-center gap-x-5">
          <div
            className={cn(
              "relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center",
              !currentUser?.image ? randomColor : "",
            )}
          >
            {currentUser?.image ? (
              <Image
                src={currentUser.image}
                alt="Foto de perfil"
                fill
                className="object-cover object-center"
              />
            ) : (
              <UserRound size="25" />
            )}
          </div>

          <div className="flex flex-col gap-y-1">
            <h3 className="text-white text-xl font-semibold line-clamp-2">
              {currentUser?.name}
            </h3>

            <span className="text-white text-base font-medium">
              @{currentUser?.nickname}
            </span>
          </div>
        </div>

        <div className="bg-[#212A35] rounded-lg flex items-center justify-center w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px]">
          {/* TODO: status do perfil */}
          <Image
            src="/images/online-icon.svg"
            alt="Online"
            width={25}
            height={25}
            className="object-contain object-center"
          />
        </div>
      </div>
    </>
  );
};

const SkeletonProfileBox = () => {
  return (
    <div className="p-5 flex items-center justify-between rounded-xl bg-gray-primary mx-6 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-none lg:w-auto lg:mx-6">
      <div className="flex items-center justify-center gap-x-5">
        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-y-1">
          <Skeleton className="w-24 h-6" />

          <Skeleton className="w-20 h-4" />
        </div>
      </div>

      <Skeleton className="w-14 h-14" />
    </div>
  );
};
