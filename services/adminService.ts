import { PendingShelter, Shelter } from '../types';
import { MOCK_PENDING_SHELTERS } from '../constants';

const PENDING_SHELTERS_KEY = 'pending_shelters_db';
const SHELTERS_KEY = 'shelters_db';

// Helper to get data from localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

// Helper to set data to localStorage
const setInStorage = <T>(key: string, value: T): void => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error writing to localStorage key “${key}”:`, error);
    }
};

// Seed initial pending shelters if none exist
const initializePendingShelters = () => {
    const pending = getFromStorage<PendingShelter[]>(PENDING_SHELTERS_KEY, []);
    if (pending.length === 0) {
        setInStorage(PENDING_SHELTERS_KEY, MOCK_PENDING_SHELTERS);
    }
}
initializePendingShelters();


export const getPendingShelters = (): Promise<PendingShelter[]> => {
    console.log("Fetching pending shelters...");
    return new Promise(resolve => {
        setTimeout(() => {
            const pendingShelters = getFromStorage<PendingShelter[]>(PENDING_SHELTERS_KEY, []);
            console.log(`${pendingShelters.length} pending shelters found.`);
            resolve(pendingShelters);
        }, 500); // Shorter delay for admin panel
    });
};

export const updateShelterStatus = (id: number, status: 'approved' | 'rejected'): Promise<void> => {
    console.log(`Updating shelter ${id} to ${status}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            let pendingShelters = getFromStorage<PendingShelter[]>(PENDING_SHELTERS_KEY, []);
            const shelterToUpdate = pendingShelters.find(s => s.id === id);

            if (!shelterToUpdate) {
                console.error(`Shelter with ID ${id} not found in pending list.`);
                return resolve();
            }

            // Remove from pending list
            pendingShelters = pendingShelters.filter(s => s.id !== id);
            setInStorage(PENDING_SHELTERS_KEY, pendingShelters);

            if (status === 'approved') {
                let approvedShelters = getFromStorage<Shelter[]>(SHELTERS_KEY, []);
                const { status, ...approvedShelter } = shelterToUpdate;
                approvedShelter.verified = true; // Mark as verified on approval
                approvedShelters.push(approvedShelter);
                setInStorage(SHELTERS_KEY, approvedShelters);
                console.log(`Shelter ${id} approved and added to main list.`);
            } else {
                console.log(`Shelter ${id} rejected.`);
            }
            
            resolve();
        }, 500);
    });
};
