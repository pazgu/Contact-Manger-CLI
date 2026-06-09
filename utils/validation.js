
function validateContactData(name, email, phone) {
    if (!name || name.trim() === "") {
        throw new Error("Name cannot be empty");
    }
    
    if (!email || !email.includes("@")) {
        throw new Error("Email must contain @ symbol");
    }
    
    if (!phone || phone.trim() === "") {
        throw new Error("Phone number cannot be empty");
    }
}

module.exports = {
    validateContactData
};