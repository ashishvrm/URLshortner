const admin = require('firebase-admin');
const serviceAccount = require('./link-shortner--firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeFirestore() {
  try {
    // Users Collection
    const userRef = db.collection('users').doc('example-user-id');
    await userRef.set({
      email: 'example@example.com',
      displayName: 'Example User',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('User document created successfully');

    // Campaigns Collection
    const campaignRef = await db.collection('campaigns').add({
      name: 'Example Campaign',
      description: 'This is an example campaign',
      startDate: admin.firestore.FieldValue.serverTimestamp(),
      endDate: admin.firestore.Timestamp.fromDate(new Date('2024-12-31')),
      type: 'email',
      status: 'active',
      createdBy: 'example-user-id',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Links Collection
    await db.collection('links').add({
      originalUrl: 'https://www.example.com',
      shortCode: 'abc123',
      campaignId: campaignRef.id,
      createdBy: 'example-user-id',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: admin.firestore.Timestamp.fromDate(new Date('2024-12-31')),
      clicks: 0
    });

    // Clicks Collection
    await db.collection('clicks').add({
      linkId: 'example-link-id',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      ipAddress: '192.168.1.1',
      referrer: 'https://www.google.com'
    });

    // Statistics Collection
    await db.collection('statistics').doc(campaignRef.id).set({
      totalClicks: 0,
      totalUniqueClicks: 0
    });

    await db.collection('statistics').doc(campaignRef.id)
      .collection('dailyStats').doc(new Date().toISOString().split('T')[0]).set({
        clicks: 0,
        uniqueClicks: 0
      });

    console.log('Firestore initialized successfully');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.details) {
      console.error('Error details:', error.details);
    }
  }
}

initializeFirestore();
