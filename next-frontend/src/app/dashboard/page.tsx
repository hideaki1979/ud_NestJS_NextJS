import DashBoard from "@/components/DashBoard";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'タスクダッシュボード',
        description: 'タスクを管理するためのダッシュボードページです。'
    }
}

export default function DashBoardPage() {
    return <DashBoard />
}
