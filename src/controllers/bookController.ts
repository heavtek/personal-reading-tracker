import { Request,Response } from "express"
import { createBook,getAllBooks,getBookById,deleteBook} from "../services/bookService.js"
import { string } from "zod"
export const addBook=async(req:Request,res:Response)=>{


try {
    const book= await createBook(
        req.user!.uid,
        req.body
    )

res.status(200).json({
    success:true,
    data:book
})

} catch (error:any) {
      res.status(500).json({
      success: false,
      message: error.message,
    });

}


}

export const allBooks=async(req:Request,res:Response)=>{
try {
    const allBooks=await getAllBooks(req.user.uid)
res.status(200).json({
  success:true,
  data:allBooks

})

} catch (error) {
    
}

}
export const getBook=async(req:Request,res:Response)=>{
    try {
        
const book=await getBookById(req.user!.uid,
    req.params.id
)

res.json({
    success:true,
    data:book
});

}catch(error:any){

res.status(404).json({
success:false,
message:error.message
})

}
}
export const removeBook=async(
req:Request,
res:Response
)=>{

await deleteBook(
req.user!.uid,
req.params.id
);

res.json({
success:true,
message:"Book deleted"
});

}