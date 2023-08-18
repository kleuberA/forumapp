'use client'
import axios from "axios";
import { useEffect, useState } from "react";

interface CategoryProps {
    id: string;
    name: string;
}
export default function Category() {
    const [categories, setCategories] = useState<CategoryProps[]>([])

    const data = async () => {
        try {
            const dataCategory = await axios.get("http://localhost:3000/api/forum/category/getAllCategory", {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(dataCategory.data)
            setCategories(dataCategory.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        data()
    }, [])

    return (
        <div className="p-6">
            <h1 className="">Categorias</h1>
            {categories.map((category) => {
                return (
                    <div className="flex flex-row gap-2">
                        <h1 className="bg-zinc-700 p-2 rounded w-32 text-center cursor-pointer hover:bg-zinc-700/80">{category.name}</h1>
                    </div>
                )
            })
            }
        </div>
    )
}