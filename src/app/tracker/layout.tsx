import MainLayout from '@/components/navbar/mainLayout'
import React, { ReactNode } from 'react'

interface AdminLayoutProps {
    children: ReactNode
}


const TrackerLayout = ({ children }: AdminLayoutProps) => {
    return <MainLayout >
        {children}
    </MainLayout>
}

export default TrackerLayout