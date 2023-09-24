import Book from "./models/Book";
import User from "./models/User";

const mapTables: Record<string, any> = {
    user: User,
    book: Book,
};


export default mapTables;