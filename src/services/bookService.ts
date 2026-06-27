import admin from "firebase-admin"
import { db } from "../config/firebase.js"


export const createBook=async(uid:string,data:any)=>{


        const doc= await db.collection("books").add({
            ...data,
            curentPage:0,
            userId:uid,
            createdAt:admin.firestore.FieldValue.serverTimestamp(),
            updatedAt:admin.firestore.FieldValue.serverTimestamp()
        })
        
        return {
             id: doc.id,
    ...data,
    currentPage: 0,
    userId: uid,
        }
  
}

export const getAllBooks=async(uid:string)=>{

    const snapshot =await db.collection("books").where("userId","==",uid).orderBy("createdAt","desc")
    .get();

const books=snapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data(),
}));

      return books;
};

export const getBookById=async(uid:string,id:string)=>{
    
    const doc=await db.collection("books").doc(id).get();

    if(!doc.exists){
           throw new Error("Book not found");
    }

const book={
    id:doc.id,
    ...doc.data
}

 if(book.userId!==uid){
        throw new Error("Unauthorized");
    }
 return book;
}

export const  deleteBook=async(uid:string,id:string)=>{

const ref=await db.collection("books").doc(id);
const doc=await ref.get();
if(!doc.exists){
    throw new Error("book not found")
}

if(doc.data()?.userId!==uid){
    throw new Error("unauthorized")
}

await ref.delete();

}

export const updateBook=async(uid:string,id:string,data:any)=>{
const ref=await db.collection("books").doc(id);
const doc=await ref.get();

if(!doc.exists){
    throw new Error("book not found")


}
if(doc.data()?.userId!==uid){
    throw new Error("unauthorized")
}
await ref.update({
    ...data,
    updatedAt:new Date()
});
return (await ref.get()).data();

}