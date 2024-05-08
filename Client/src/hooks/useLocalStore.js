import { useCallback, useState, useEffect } from 'react';

/**
 * Use local storage to persist a value
 * @param key - The key to store the value under
 * @param defaultValue - The default value
 * @returns The value, a setter function, and a remove function
 * @example
 * const [name, setName, removeName] = useLocalStorage("name", "Viet");
 * console.log(Name); // "Viet"
 * setName("Quoc");
 * console.log(value); // "Quoc"
 * removeName();
 */
export function useLocalStorage(key, defaultValue) {
    return useStorage(key, defaultValue, window.localStorage);
}

/**
 * Use session storage to persist a value
 * @param key - The key to store the value under
 * @param defaultValue - The default value
 * @returns The value, a setter function, and a remove function
 * @example
 * const [name, setName, removeName] = useSessionStorage("name", "Viet");
 * console.log(Name); // "Viet"
 * setName("Quoc");
 * console.log(value); // "Quoc"
 * removeName();
 */
export function useSessionStorage(key, defaultValue) {
    return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof defaultValue === 'function') {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (value === undefined) return storageObject.removeItem(key);
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, remove];
}
