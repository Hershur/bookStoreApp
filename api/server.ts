import express from 'express';
import router from './src/routes';
import sequelize from './src/orm/createDbConnection';
import { FetchTableDataController } from './src/controllers';


export const app = express();


app.use('/', router);


const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('Entities created successfully.');
    
    // seed user table by default
    await FetchTableDataController.insertUserRecords();
    console.log('user records seeded successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
)()