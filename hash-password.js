const bcrypt = require('bcryptjs');

async function hashPassword() {
  try {
    const password = 'admin123';
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);
    console.log('Hashed password for admin user:');
    console.log(hashed);
    console.log('\nUse this in your MongoDB Compass document:');
    console.log(`{\n  "name": "Admin User",\n  "email": "admin@example.com",\n  "password": "${hashed}",\n  "role": "admin",\n  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"}\n}`);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

hashPassword();