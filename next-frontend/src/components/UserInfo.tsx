import { useQueryUser } from "@/hooks/useQueryUser"
import { Loader } from "@mantine/core"

const UserInfo = () => {
    const {data: user, status} = useQueryUser()
    if(status === 'loading') return <Loader />

    return (
        <div>{user?.email}</div>
    )
}

export default UserInfo