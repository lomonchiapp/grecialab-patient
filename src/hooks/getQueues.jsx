import { database } from "../firebase";
import {getDocs, collection} from "firebase/firestore";

export const getQueues = async () => {
    const queuesCollection = collection(database, 'queues')
    const queuesSnapshot = await getDocs(queuesCollection)
    const queues = queuesSnapshot.docs.map(doc => doc.data())
    return queues
}