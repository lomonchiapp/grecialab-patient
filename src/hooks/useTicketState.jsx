import { create } from "zustand"
import {serverTimestamp} from 'firebase/firestore'

export const useTicketState = create((set) => ({
    patientName: '',
    selectedServices: [],
    selectedQueues: [],
    status: 'pending',
    createdAt: serverTimestamp(),
    setPatientName: (patientName) => set({ patientName }),
    setCedula: (cedula) => set({ cedula }),
    setSelectedQueues: (selectedQueues) => set({ selectedQueues }),
    setSelectedServices: (selectedServices) => set({ selectedServices }),
    resetTicket: () => set({ name: '', cedula: '', selectedServices: [], selectedQueues: [] }),
}))