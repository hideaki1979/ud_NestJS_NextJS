import { useQueryUser } from "@/hooks/useQueryUser"
import { Loader } from "@mantine/core"

const UserInfo = () => {
    const {data: user, isLoading, isError} = useQueryUser()
    if(isLoading) return <Loader />
    if(isError) return <p>ユーザー情報取得に失敗しました</p>

    return (
        <div>{user?.email}</div>
    )
}

export default UserInfo