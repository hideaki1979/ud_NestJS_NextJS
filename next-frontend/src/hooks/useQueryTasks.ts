import { Task } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Error from "next/error"
import { useRouter } from "next/navigation"

const getTasks = async () => {
    const {data} = await axios.get<Task[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/todo`
    )

    return data
}

export const useQueryTasks = () => {
    const router = useRouter()

    return useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: getTasks,
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    router.push('/auth')
                }
            }
        }
    })
}