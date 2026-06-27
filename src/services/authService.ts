import admin from "firebase-admin";
import { db } from "../config/firebase.js";

export const syncUserProfile = async (
  uid: string,
  name: string,
  email: string
) => {
  const userRef = db.collection("users").doc(uid);

  const doc = await userRef.get();

  if (!doc.exists) {
    await userRef.set({
      uid,
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  return (await userRef.get()).data();
};