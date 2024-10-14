import { database } from "../firebase";
import {getDocs, collection} from "firebase/firestore";

export const getServices = async () => {
    const servicesCollection = collection(database, 'services')
    const servicesSnapshot = await getDocs(servicesCollection)
    const services = servicesSnapshot.docs.map(doc => doc.data())
    return services
}