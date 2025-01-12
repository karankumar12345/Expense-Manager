import { Client, Databases, Account, Storage } from 'appwrite';

// Initialize Appwrite client
const client = new Client();
client
  // Replace with your Appwrite endpoint
  .setProject('65abf19a3d563c44f20f'); // Replace with your project ID

// Initialize Appwrite services
export const account = new Account(client);

export const database = new Databases(client);

export const storage = new Storage(client);

// Export client for any additional customizations
export default client;
