import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";

export const newTicket = async (ticket, queues) => {
    try {
        const ticketRef = await addDoc(collection(database, 'tickets'), ticket);
        
        for (const queue of queues) {
            await updateDoc(doc(database, 'queues', queue.id), {
                ...queue,
                count: queue.count + 1,
            });
        }
        
        return ticketRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
    }
};