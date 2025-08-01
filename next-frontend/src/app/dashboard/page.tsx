import DashBoard from "@/components/DashBoard";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'タスクダッシュボード',
        description: 'ログインまたはサインアップしてアカウントにアクセス'
    }
}

const DashBoardPage = () => {
    return <DashBoard />
}

export default DashBoardPage