const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Get MongoDB URI from environment or use default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-platform';

async function seedAdmin() {
  try {
    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    // Get database and collection
    const db = client.db('blog-platform');
    const usersCollection = db.collection('users');
    
    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('📧 Email: admin@example.com');
      console.log('🔑 Password: admin123');
      await client.close();
      return;
    }
    
    // Create admin user with hashed password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    };
    
    // Insert admin user
    await usersCollection.insertOne(adminUser);
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Password: admin123');
    console.log('🚀 You can now log in at http://localhost:3000/admin/login');
    
    // Close connection
    await client.close();
    console.log('✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();