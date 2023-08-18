import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ButtonUserProps {

}
export default function ButtonUser(props: ButtonUserProps) {

    const { data: session } = useSession();

    const nameUser = session?.user?.name;
    console.log(nameUser?.toUpperCase())

    return (
        <div className="flex flex-row text-center p-2 items-center gap-2 w-full hover:bg-zinc-700/90 transition-all rounded">
            <Avatar>
                <AvatarImage src={session?.user?.image || 'https://github.com/shadcn.png'} />
                <AvatarFallback>{nameUser?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className="text-white">{session?.user?.name}</h1>
        </div>
    )
}