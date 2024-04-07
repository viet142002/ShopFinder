export function notification({
    body,
    icon = 'https://via.placeholder.com/150',
    title
}) {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return;
    }

    const handleClick = (e) => {
        window.focus();
        e.target.close();
    };

    if (Notification.permission === 'granted') {
        const notify = new Notification(title, {
            icon: icon,
            body: body
        });
        notify.onclick = handleClick;
        return;
    }

    if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const notify = new Notification(title, {
                    icon: icon,
                    body: body
                });
                notify.onclick = handleClick;
                return;
            }
        });
    }
    return;
}
