const contactService = require('./contactService');
const fileUtils = require('../utils/fileUtils');

jest.mock('../utils/fileUtils');

describe('Contact Service', () => {
    
    beforeEach(() => {
        jest.clearAllMocks(); 
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    describe('addContact', () => {
        test('should successfully add a new contact if email is unique', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([
                { name: "Jane Doe", email: "jane@example.com", phone: "111" }
            ]);
            await contactService.addContact("John Doe", "john@example.com", "555");

            expect(fileUtils.saveContactsFile).toHaveBeenCalledWith([
                { name: "Jane Doe", email: "jane@example.com", phone: "111" },
                { name: "John Doe", email: "john@example.com", phone: "555" }
            ]);
        });

        test('should throw an error if email already exists', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([
                { name: "Jane Doe", email: "jane@example.com", phone: "111" }
            ]);

            await expect(
                contactService.addContact("Another Jane", "jane@example.com", "222")
            ).rejects.toThrow("Contact with this email already exists");

            expect(fileUtils.saveContactsFile).not.toHaveBeenCalled();
        });
    });

    describe('deleteContact', () => {
        test('should delete contact if email exists', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([
                { name: "John Doe", email: "john@example.com", phone: "555" },
                { name: "Jane Doe", email: "jane@example.com", phone: "111" }
            ]);

            await contactService.deleteContact("john@example.com");

            expect(fileUtils.saveContactsFile).toHaveBeenCalledWith([
                { name: "Jane Doe", email: "jane@example.com", phone: "111" }
            ]);
        });

        test('should throw error if email to delete is not found', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([
                { name: "John Doe", email: "john@example.com", phone: "555" }
            ]);

            await expect(
                contactService.deleteContact("notfound@example.com")
            ).rejects.toThrow("No contact found with email: notfound@example.com");
        });
    });

    describe('listContacts', () => {
        test('should list all contacts successfully', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([
                { name: "John Doe", email: "john@example.com", phone: "555" }
            ]);

            await contactService.listContacts();
            
            // מוודא שהפונקציה אכן פנתה לקרוא את הקובץ
            expect(fileUtils.loadContactsFile).toHaveBeenCalled();
        });

        test('should print a message if no contacts found', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([]);

            await contactService.listContacts();
            
            expect(fileUtils.loadContactsFile).toHaveBeenCalled();
        });
    });

    describe('searchContacts', () => {
        test('should find and list matching contacts case-insensitively', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([
                { name: "John Doe", email: "john@example.com", phone: "555" },
                { name: "Jane Smith", email: "jane@example.com", phone: "111" }
            ]);

            await contactService.searchContacts("jOhn");
            
            expect(fileUtils.loadContactsFile).toHaveBeenCalled();
        });

        test('should handle case where no search results are found', async () => {
            fileUtils.loadContactsFile.mockResolvedValue([
                { name: "John Doe", email: "john@example.com", phone: "555" }
            ]);
            await contactService.searchContacts("Bob");
            
            expect(fileUtils.loadContactsFile).toHaveBeenCalled();
        });
    });
});