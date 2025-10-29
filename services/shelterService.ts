import { Shelter, NewShelterData, PendingShelter } from '../types';
import { MOCK_SHELTERS } from '../constants';

const SHELTERS_KEY = 'shelters_db';
const PENDING_SHELTERS_KEY = 'pending_shelters_db';

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

// Seed initial approved shelters if none exist
const initializeShelters = () => {
    const shelters = getFromStorage<Shelter[]>(SHELTERS_KEY, []);
    if (shelters.length === 0) {
        setInStorage(SHELTERS_KEY, MOCK_SHELTERS);
    }
};
initializeShelters();

/**
 * Simulates fetching a list of approved shelters from a database.
 * Reads from localStorage and adds a delay to mimic network latency.
 */
export const getShelters = (): Promise<Shelter[]> => {
  console.log("Fetching latest shelter data...");
  return new Promise(resolve => {
    setTimeout(() => {
      const shelters = getFromStorage<Shelter[]>(SHELTERS_KEY, []);
      console.log("Shelter data received.", shelters);
      resolve(shelters); 
    }, 1000);
  });
};

/**
 * Simulates submitting a new shelter for registration.
 * Adds the new shelter to a "pending" list in localStorage for admin approval.
 */
export const registerNewShelter = (newShelter: NewShelterData): Promise<void> => {
    console.log("Registering new shelter...", newShelter);
    return new Promise(resolve => {
        setTimeout(() => {
            const pendingShelters = getFromStorage<PendingShelter[]>(PENDING_SHELTERS_KEY, []);
            
            const newPendingShelter: PendingShelter = {
                ...newShelter,
                id: Date.now(), // Use timestamp for a unique ID
                bedsAvailable: newShelter.capacity, // Initially, all beds are available
                verified: false,
                status: 'pending',
            };

            pendingShelters.push(newPendingShelter);
            setInStorage(PENDING_SHELTERS_KEY, pendingShelters);
            
            console.log("New shelter submitted for review.");
            resolve();
        }, 1000);
    });
};