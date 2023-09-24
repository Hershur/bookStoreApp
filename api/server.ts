import express from 'express';
import router from './src/routes';

export const app = express();


app.use('/', router);


const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});