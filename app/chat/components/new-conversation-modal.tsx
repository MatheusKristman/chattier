"use client";

import { X } from "lucide-react";
import { User } from "@prisma/client";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { NewContactBox } from "./new-contact-box";
import useContactStore from "@/stores/use-contact-store";

interface NewConversationModalProps {
  newContacts: User[];
}

export const NewConversationModal = ({
  newContacts,
}: NewConversationModalProps) => {
  const { isNewConversationModalOpen, closeNewConversationModal } =
    useContactStore();

  const [users, setUsers] = useState<User[]>(newContacts);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  console.log(users);

  useEffect(() => {
    if (searchValue.length > 3 && users.length > 0) {
      const searchResult = users.filter((user) =>
        user.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            searchValue
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase(),
          ),
      );

      setFilteredUsers(searchResult);
    }
  }, [searchValue, users]);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function clearSearch() {
    setSearchValue("");
  }

  return (
    <>
      {isNewConversationModalOpen && (
        <div className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
          <div className="w-full max-w-[700px] bg-gray-secondary px-9 py-6 rounded-[30px] inline-block align-middle">
            <div className="flex justify-end mb-9">
              <Button
                onClick={closeNewConversationModal}
                className="bg-transparent hover:bg-transparent"
              >
                <X size="40px" strokeWidth="1.5" color="#FFFFFF" />
              </Button>
            </div>

            <div role="searchbox" className="relative mb-12">
              <Input
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Pesquise o nome do usuário"
                className="bg-[#161D26] rounded-lg w-full h-12 placeholder:text-[#26313E] text-base border-none pl-12 text-white"
              />

              <span
                aria-hidden="true"
                className="bg-search-icon bg-no-repeat bg-contain bg-center w-7 h-7 absolute top-1/2 left-2.5 -translate-y-1/2"
              />

              {searchValue.length > 0 ? (
                <Button
                  onClick={clearSearch}
                  variant="link"
                  className="px-2 absolute top-1/2 right-2.5 -translate-y-1/2 z-20"
                >
                  <X className="text-slate-600" />
                </Button>
              ) : null}
            </div>

            <div className="w-full flex flex-col gap-y-9">
              {isLoading ? (
                <>
                  <NewConversationModalSkeleton />
                  <NewConversationModalSkeleton />
                  <NewConversationModalSkeleton />
                </>
              ) : filteredUsers.length > 0 && searchValue.length >= 3 ? (
                filteredUsers.map((user) => (
                  <NewContactBox
                    key={user.id}
                    imageSrc={user.image}
                    name={user.name}
                    userId={user.id}
                  />
                ))
              ) : users.length > 0 && searchValue.length < 3 ? (
                users.map((user) => (
                  <NewContactBox
                    key={user.id}
                    imageSrc={user.image}
                    name={user.name}
                    userId={user.id}
                  />
                ))
              ) : (
                <div className="w-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-slate-600">
                    Nenhum contato presente...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NewConversationModalSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center justify-center gap-x-5">
        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-y-1">
          <Skeleton className="w-32 h-6" />
        </div>
      </div>

      <Skeleton className="w-36 h-11" />
    </div>
  );
};
