function NotificationPage() {
    const handleClick = () => {
        console.log('clicked');
    };
    return (
        <>
            <div className="mx-auto mt-10 w-[max(200px,50%)] bg-gray-200 p-6">
                <h1>Notification Page</h1>

                <button
                    onClick={handleClick}
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
                >
                    Click me
                </button>
            </div>
        </>
    );
}

export default NotificationPage;
