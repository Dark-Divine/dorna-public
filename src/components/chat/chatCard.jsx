import React from 'react'

export default function ChatCard(data) {
    return (
        <div className="flex w-full items-center gap-2">
            <div className="w-1/6 p-1">
                <span className="w-12 h-12 rounded-full bg-slate-300 block"></span>
            </div>
            <div className="w-full">
                <div>
                    <div className="text-sm">{data.chat.Nametalar}</div>
                    <div className="text-xs">{data.chat.specialtalar}</div>
                </div>
                <div></div>
            </div>
        </div>
    )
}
