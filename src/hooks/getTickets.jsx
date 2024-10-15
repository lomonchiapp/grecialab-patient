import { database } from "../firebase";
import {getDocs, collection} from "firebase/firestore";

export const getTickets = async () => {
    const ticketsCollection = collection(database, 'tickets')
    const ticketsSnapshot = await getDocs(ticketsCollection)
    const tickets = ticketsSnapshot.docs.map(doc => doc.data())
    return tickets
}