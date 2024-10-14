const admin = require('firebase-admin');
const faker = require('faker');
const moment = require('moment');
const serviceAccount = require('./link-shortner--firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const generateRandomData = (count) => {
  const users = [];
  const campaigns = [];
  const links = [];
  const clicks = [];

  for (let i = 0; i < count; i++) {
    // Generate User
    const user = {
      email: faker.internet.email(),
      displayName: faker.name.findName(),
      createdAt: admin.firestore.Timestamp.fromDate(faker.date.past()),
      updatedAt: admin.firestore.Timestamp.fromDate(faker.date.recent())
    };
    users.push(user);

    // Generate Campaign
    const campaign = {
      name: faker.company.catchPhrase(),
      description: faker.lorem.sentence(),
      startDate: admin.firestore.Timestamp.fromDate(faker.date.recent()),
      endDate: admin.firestore.Timestamp.fromDate(faker.date.future()),
      type: faker.random.arrayElement(['email', 'social', 'ppc', 'display']),
      status: faker.random.arrayElement(['active', 'paused', 'completed']),
      createdBy: user.email,
      createdAt: admin.firestore.Timestamp.fromDate(faker.date.past()),
      updatedAt: admin.firestore.Timestamp.fromDate(faker.date.recent())
    };
    campaigns.push(campaign);

    // Generate Link
    const link = {
      originalUrl: faker.internet.url(),
      shortCode: faker.random.alphaNumeric(6),
      campaignId: `campaign_${i}`,
      createdBy: user.email,
      createdAt: admin.firestore.Timestamp.fromDate(faker.date.past()),
      expiresAt: admin.firestore.Timestamp.fromDate(faker.date.future()),
      clicks: faker.datatype.number({ min: 0, max: 1000 })
    };
    links.push(link);

    // Generate Clicks
    for (let j = 0; j < faker.datatype.number({ min: 1, max: 10 }); j++) {
      const click = {
        linkId: `link_${i}`,
        timestamp: admin.firestore.Timestamp.fromDate(faker.date.recent()),
        userAgent: faker.internet.userAgent(),
        ipAddress: faker.internet.ip(),
        referrer: faker.internet.url()
      };
      clicks.push(click);
    }
  }

  return { users, campaigns, links, clicks };
};

const populateFirestore = async () => {
  const { users, campaigns, links, clicks } = generateRandomData(100);

  const batch = db.batch();

  users.forEach((user, index) => {
    const userRef = db.collection('users').doc(`user_${index}`);
    batch.set(userRef, user);
  });

  campaigns.forEach((campaign, index) => {
    const campaignRef = db.collection('campaigns').doc(`campaign_${index}`);
    batch.set(campaignRef, campaign);
  });

  links.forEach((link, index) => {
    const linkRef = db.collection('links').doc(`link_${index}`);
    batch.set(linkRef, link);
  });

  clicks.forEach((click, index) => {
    const clickRef = db.collection('clicks').doc(`click_${index}`);
    batch.set(clickRef, click);
  });

  try {
    await batch.commit();
    console.log('Firestore populated successfully with random data');
  } catch (error) {
    console.error('Error populating Firestore:', error);
  }
};

populateFirestore();

