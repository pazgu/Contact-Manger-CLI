const { validateContactData } = require('./validation');

describe('Validation Utils', () => {
    
    test('should pass with valid contact data', () => {
        expect(() => {
            validateContactData("John Doe", "john@example.com", "555-1234");
        }).not.toThrow();
    });

    test('should throw error if name is empty', () => {
        expect(() => {
            validateContactData("", "john@example.com", "555-1234");
        }).toThrow("Name cannot be empty");
    });

    test('should throw error if email does not contain @', () => {
        expect(() => {
            validateContactData("John Doe", "john-example.com", "555-1234");
        }).toThrow("Email must contain @ symbol");
    });

    test('should throw error if phone is empty', () => {
        expect(() => {
            validateContactData("John Doe", "john@example.com", "  ");
        }).toThrow("Phone number cannot be empty");
    });
});