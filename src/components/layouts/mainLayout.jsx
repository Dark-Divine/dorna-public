import React from 'react'
import { Toaster } from 'react-hot-toast'

export default function MainLayout({ children }) {
    return (
        <>
            <Toaster
                containerClassName="font-[IRANSans-Regular]"
                toastOptions={{ duration: 3000 }}
                position="bottom-center"
                reverseOrder={false}
            />
            {children}
        </>
    )
}
