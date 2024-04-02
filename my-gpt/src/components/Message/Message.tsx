type MessageProps = {
    sender: string
    title: string,
    message: string,
    timestamp?: string
}

export default function Message({ sender, title, message, timestamp = "" }: MessageProps) {
    return (
        <div className="flex items-start gap-2.5 mx-8 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-300">
                <span className="w-8 h-8 flex justify-center items-center">{sender}</span>
            </div>
            <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
                    {timestamp && <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{timestamp}</span>}
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message}</p>
            </div>
    </div>
    )
}