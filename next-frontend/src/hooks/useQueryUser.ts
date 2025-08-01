import { UserPayload } from "@/types"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"

export const useQueryUser = () => {
    const router = useRouter()
    const getUser = async () => {
        const { data } = await axios.get<UserPayload>(
            `${process.env.NEXT_PUBLIC_API_URL}/user`
        )
        return data
    }

    return useQuery<UserPayload>({
        queryKey: ['user'],
        queryFn: getUser,
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    router.push('/auth')
                }
            }
        }
    })
}
