import { create } from "zustand"
import {serverTimestamp} from 'firebase/firestore'

export const useTicketState = create((set) => ({
    patientName: '',
    selectedService: null,
    selectedQueue: null,
    status: 'Pendiente',
    createdAt: serverTimestamp(),
    setPatientName: (patientName) => set({ patientName }),
    setCedula: (cedula) => set({ cedula }),
    setSelectedQueue: (selectedQueue) => set({ selectedQueue }),
    setSelectedService: (selectedService) => set({ selectedService }),
    resetTicket: () => set({ name: '', cedula: '', selectedService: null }),
}))