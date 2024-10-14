import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, DocumentData, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from '../firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface CampaignData {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: string;
  status: string;
  statistics: { month: string; visitors: number }[];
}

export async function getCampaigns(): Promise<CampaignData[]> {
  const campaignsCol = collection(db, 'campaigns');
  const campaignSnapshot = await getDocs(campaignsCol);
  const campaignList = campaignSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      type: data.type,
      status: data.status,
      statistics: data.statistics || []
    };
  });
  return campaignList;
}

export async function getCampaignById(id: string): Promise<CampaignData | null> {
  const docRef = doc(db, 'campaigns', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      description: data.description,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      type: data.type,
      status: data.status,
      statistics: data.statistics || []
    };
  } else {
    return null;
  }
}
