import { Request, Response, NextFunction } from "express";
import User from "../orm/models/User";
import mapTables from "../orm/mapTables";
import Book from "../orm/models/Book";

export class FetchTableDataController {

    public static async fetch(req: Request, res: Response) {
        try {
            const tableName = req.params.table as string;

            if(!mapTables[tableName]) {
                throw new Error('NO_TABLE');
            }

            const data = await mapTables[tableName].findAll();

            return res.status(200).send({
                message: 'Records returned successfully',
                data,
            });

        } catch (error) {
            if((error as any).message === 'NO_TABLE'){
                return res.status(400).send({message: `Table '${req.params.table}' does not exist`, data: null});
            }

            return res.status(500).send({message: 'An error occurred'});
        }
  
    }

    public static async seedUsers(req: Request, res: Response, next: NextFunction) {

        try {
            // seed data to table
            await FetchTableDataController.insertUserRecords();

            const users = await User.findAll();

            return res.status(200).send({
                message: 'Data seeded',
                data: users,
            });
            
        } catch (error) {
            return res.status(500).send({message: 'An error occurred'});
        }
    }

    public static async insertUserRecords() {
        await User.bulkCreate([
            { name: 'James', address: 'Lagos', age: 30 },
            { name: 'Allan', address: 'Lagos', age: 3 },
            { name: 'Keith', address: 'Lagos', age: 20 },
            { name: 'Doe', address: 'Lagos', age: 51 }
        ]).catch((error: unknown) => {
            console.log(error);
        });
    }


    public static async seedBooks(req: Request, res: Response, next: NextFunction) {

        try {
            // seed data to table
            // Crazy Rich Asians is a satirical

            await Book.bulkCreate([
                { name: 'Crazy Rich Asians', author: 'Kevin Kwan', category: 'Story' },
                { name: 'Black Swan Green', author: 'David Mitchell', category: 'Auto-biography' },
                { name: 'Book of Numbers', author: 'Joshua Cohen', category: 'Novel' },
            ]).catch((error: unknown) => {
                console.log(error);
            });

            const books = await Book.findAll();

            return res.status(200).send({
                message: 'Data seeded',
                data: books,
            });
            
        } catch (error) {
            return res.status(500).send({message: 'An error occurred'});
        }
    }
  
}