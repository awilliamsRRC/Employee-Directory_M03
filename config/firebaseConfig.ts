import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as serviceAccount from "../branch-database-project3-firebase-adminsdk-fbsvc-4305f5893f.json";

//const serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '{}');

// Initialize the Firebase app with the service account credentials
// This step is necessary before you can use any Firebase services
console.log(serviceAccount);
initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
// This creates a Firestore instance that you can use to interact with your database
const db: Firestore = getFirestore();

export { db };