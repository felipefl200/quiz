import Image from "next/image";
import { User } from "next-auth";
import { Avatar } from "./ui/avatar";

type UserAvatarProps = {
  user: Pick<User, "name" | "image">;
};
export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar>
      <div className="relative w-full h-full aspect-square">
        <Image
          fill
          alt="User profile Image"
          src={user?.image || `https://ui-avatars.com/api/?name=${user.name}`}
          sizes="(max-width: 400px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
        />
      </div>
    </Avatar>
  );
}
