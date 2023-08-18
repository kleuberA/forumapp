"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import Image from "next/image";

interface AllForunsProps {
    foruns: any;
    count: number;
}
export default function AllForuns() {
    const [foruns, setForuns] = useState<AllForunsProps[]>([])
    const [numberForuns, setNumberForuns] = useState<number>(0)

    const data = async () => {
        try {
            const allForuns = await axios.get("http://localhost:3000/api/forum/getforum", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(allForuns.data)
            setForuns(allForuns.data.foruns)
            setNumberForuns(allForuns.data.count)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        data()
    }, [])

    return (
        <div className="p-6 flex flex-col gap-2">
            <h1 className="font-medium text-2xl">Todos os Foruns</h1>
            {
                foruns.map((forum: any) => {
                    return (
                        <div key={forum._id} className="flex flex-col gap-4">
                            <div className="bg-zinc-700 p-2 h-20 w-full rounded flex flex-row justify-between items-center">
                                <div>
                                    <h1>{forum.name}</h1>
                                    <span className="text-xs">{forum.description}</span>
                                </div>
                                <Button>Entrar no forum</Button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}