import { QUERY_KEYS } from "@/constants/queryKeys"
import { handleAuthError } from "@/utils/authUtils"
import { Task } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"

const getTasks = async () => {
    const { data } = await axios.get<Task[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/todo`
    )
    return data
}

export const useQueryTasks = () => {
    const router = useRouter()

    return useQuery<Task[], AxiosError>({
        queryKey: [QUERY_KEYS.TASKS],
        queryFn: getTasks,
        onError: (err) => {
            handleAuthError(err, router)
        }
    })
}