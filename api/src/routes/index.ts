import { Router } from "express";
import { FetchTableDataController } from "../controllers";


const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to express API')
});

router.get('/fetch/:table', FetchTableDataController.fetch);

router.post('/seed/user', FetchTableDataController.seedUsers);

router.post('/seed/book', FetchTableDataController.seedBooks);



export default router;

