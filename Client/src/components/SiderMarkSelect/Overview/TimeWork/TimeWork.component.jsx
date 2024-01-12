function TimeWork() {
    return (
        <div className="flex justify-between items-center px-siderInfo py-[20px] border-t border-gray-200">
            <div className="flex items-center">
                <div className="flex flex-col">
                    <span className="text-[16px] font-semibold">Time Work</span>
                    <span className="text-[12px] text-gray-500">
                        Monday - Friday
                    </span>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex flex-col">
                    <span className="text-[16px] font-semibold">
                        8:00 - 18:00
                    </span>
                    <span className="text-[12px] text-gray-500">Open Now</span>
                </div>
            </div>
        </div>
    );
}

export default TimeWork;
