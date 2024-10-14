import {create} from 'zustand'
import { getServices } from './getServices'

export const useFormState = create((set) => ({
    currentStep: 1,
    services: [],
    setCurrentStep: (currentStep) => set({currentStep}),
    reset: () => set({currentStep: 1}),
    nextStep: () => set((state) => ({currentStep: state.currentStep + 1})),
    prevStep: () => set((state) => ({currentStep: state.currentStep - 1})),
    setServices: (services) => set({services}),
    fetchServices: async () => {
        const services = await getServices()
        set({services})
    },
    subscribeToServices: () => {
        const unsubscribe = getServices((services) => {
            set({services})
        })
        return unsubscribe
    }
}))