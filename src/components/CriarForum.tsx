'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { set, z } from "zod";

const schema = z.object({
    nomeForum: z.string(),
    descricaoForum: z.string(),
    file: z.instanceof(File).nullable(),
})

export default function CriarForum() {

    const { data: session } = useSession();

    const [nomeForum, setNomeForum] = useState<string>("")
    const [descricaoForum, setDescricaoForum] = useState<string>("")
    const [file, setFile] = useState<File>()
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("name", nomeForum);
            formData.append("description", descricaoForum);
            formData.append("categoryId", "64d8386efc804880bb83d016");
            formData.append("userID", session?.user?.id);

            const response = await axios.post("http://localhost:3000/api/forum/criarforum", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response.data);
            setNomeForum("");
            setDescricaoForum("");
            setFile(undefined);
            setImagePreview(null);
        } catch (err) {
            console.log(err);
        }
    }
    const isFormValid = schema.safeParse({
        nomeForum,
        descricaoForum,
        file,
    }).success;

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex gap-2"><PlusSquare /> Criar Forum</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar Forum</DialogTitle>
                    </DialogHeader>
                    <div>
                        <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col gap-4">
                            <Input type="text" onChange={(e) => setNomeForum(e.target.value)} className="text-black" placeholder="Nome do Forum" />
                            <Input type="text" onChange={(e) => setDescricaoForum(e.target.value)} placeholder="Descrição do Forum" className="text-black" />
                            <Label>Imagem do Forum</Label>
                            <Input
                                type="file"
                                name="file"
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0];
                                    setFile(selectedFile);

                                    if (selectedFile) {
                                        const imageURL = URL.createObjectURL(selectedFile);
                                        setImagePreview(imageURL);
                                    }
                                }}
                            />
                            {imagePreview && (
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <img src={imagePreview} className="h-56 rounded" alt="Imagem Selecionada" style={{ maxWidth: "100%" }} />
                                </div>
                            )}
                            <Button type="submit" disabled={!isFormValid}>Criar Forum</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}