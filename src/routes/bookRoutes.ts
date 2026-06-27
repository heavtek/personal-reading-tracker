import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { addBook,allBooks,getBook,removeBook} from "../controllers/bookController.js"

const router=express.Router()
router.use(protect)

router.post("/addbook",addBook);
router.get("/", allBooks);
router.get("/:id",getBook);
router.delete("/:id",removeBook)

export default router;