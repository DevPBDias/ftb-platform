import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccountString = Buffer.from(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY!,
  "base64"
).toString("utf8");
const serviceAccount = JSON.parse(serviceAccountString);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const adminDB = getFirestore();
