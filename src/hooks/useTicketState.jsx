import { create } from "zustand"
import {serverTimestamp} from 'firebase/firestore'

export const useTicketState = create((set) => ({
    patientName: '',
    serviceSelected: null,
    status: 'Pendiente',
    createdAt: serverTimestamp(),
    setPatientName: (patientName) => set({ patientName }),
    setCedula: (cedula) => set({ cedula }),
    setServiceSelected: (serviceSelected) => set({ serviceSelected }),
    resetTicket: () => set({ name: '', cedula: '', serviceSelected: null }),
}))