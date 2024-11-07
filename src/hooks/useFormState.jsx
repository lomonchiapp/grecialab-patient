import {create} from 'zustand'
import { getServices } from './getServices'
import { getQueues } from './getQueues'
import { getTickets } from './getTickets'
import { database } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { getIP } from './getIP'

export const useFormState = create((set) => ({
    currentStep: 1,
    services: [],
    queues: [],
    tickets: [],
    serverIP: '',
    setCurrentStep: (currentStep) => set({currentStep}),
    reset: () => set({currentStep: 1}),
    nextStep: () => set((state) => ({currentStep: state.currentStep + 1})),
    prevStep: () => set((state) => ({currentStep: state.currentStep - 1})),
    setServices: (services) => set({services}),
    setServerIP: (serverIP) => set({serverIP}),
    setQueues: (queues) => set({queues}),
    setTickets: (tickets) => set({tickets}),
    fetchServices: async () => {
        const services = await getServices()
        set({services})
    },
    fetchIP: async () => {
      const serverIP = await getIP();
      set({ serverIP });
    },
    fetchQueues: async () => {
        const queues = await getQueues()
        set({queues})
    },
    fetchTickets: async () => {
        const tickets = await getTickets()
        set({tickets})
    },

    subscribeToTickets: () => {
        const q = collection(database, "tickets");
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          set({ tickets: data });
          console.log("Tickets data:", data);
        });
        return unsubscribe;
      },
}))