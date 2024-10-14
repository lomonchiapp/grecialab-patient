import {create} from 'zustand'

export const useFormState = create((set) => ({
    currentStep: 1,
    setCurrentStep: (currentStep) => set({currentStep}),
    reset: () => set({currentStep: 1}),
    nextStep: () => set((state) => ({currentStep: state.currentStep + 1})),
    prevStep: () => set((state) => ({currentStep: state.currentStep - 1})),
}))