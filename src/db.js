import { db } from './firebase';
import {
  doc, getDoc, setDoc, collection,
  getDocs, deleteDoc
} from 'firebase/firestore';

// All data lives under /accounts/{accountId}/
// Keys mirror the old window.storage keys exactly so the app logic is unchanged.

const KEY_MAP = {
  'iel:jobs':         'jobs',
  'iel:punches':      'punches',
  'iel:plantsRec':    'plantsRec',
  'iel:materialsRec': 'materialsRec',
  'iel:equipmentLog': 'equipmentLog',
  'iel:truckLog':     'truckLog',
  'iel:trailerLog':   'trailerLog',
  'iel:rates':        'rates',
  'iel:equipment':    'equipment',
  'iel:trucks':       'trucks',
  'iel:trailers':     'trailers',
  'iel:stockItems':   'stockItems',
  'iel:crew':         'crew',
};

function docRef(accountId, key) {
  const name = KEY_MAP[key] || key;
  return doc(db, 'accounts', accountId, 'data', name);
}

export async function fsGet(accountId, key) {
  try {
    const snap = await getDoc(docRef(accountId, key));
    if (!snap.exists()) return null;
    return snap.data().value ?? null;
  } catch (e) {
    console.error('fsGet error', key, e);
    return null;
  }
}

export async function fsSet(accountId, key, value) {
  try {
    await setDoc(docRef(accountId, key), { value });
    return true;
  } catch (e) {
    console.error('fsSet error', key, e);
    return false;
  }
}

export async function fsDelete(accountId, key) {
  try {
    await deleteDoc(docRef(accountId, key));
    return true;
  } catch (e) {
    return false;
  }
}

// Load all keys at once on startup
export async function fsLoadAll(accountId) {
  try {
    const colRef = collection(db, 'accounts', accountId, 'data');
    const snap = await getDocs(colRef);
    const result = {};
    snap.forEach(d => { result['iel:' + d.id] = d.data().value; });
    return result;
  } catch (e) {
    console.error('fsLoadAll error', e);
    return {};
  }
}
