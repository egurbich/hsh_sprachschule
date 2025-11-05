// Minimal IndexedDB helper (TypeScript)
// Provides: openDB, addCourse, getAllCourses, seedDefaultCoursesIfEmpty, addCartItem, getCartItems

export type CourseRecord = {
  course_id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number; // in months
};

export type CartRecord = {
  cart_id?: number; // auto-generated
  course_id: number;
  price: number;
  people_qty: number;
  needs_appartment: boolean;
  total: number;
};

const DB_NAME = "hsh_sprachschule_db";
const DB_VERSION = 2;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = req.result;
      const oldVersion = event.oldVersion;

      // Only create/upgrade stores and indexes here. Avoid additional transactions.
      if (oldVersion < 1) {
        const store = db.createObjectStore("courses", { keyPath: "course_id" });
        store.createIndex("title", "title", { unique: false });
      }

      if (oldVersion < 2) {
        if (!db.objectStoreNames.contains("shopping_cart")) {
          const cartStore = db.createObjectStore("shopping_cart", { keyPath: "cart_id", autoIncrement: true });
          cartStore.createIndex("course_id", "course_id", { unique: false });
        }
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function promisifyRequest<T>(req: IDBRequest): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  });
}

export async function addCourse(course: CourseRecord): Promise<void> {
  const db = await openDB();
  const tx = db.transaction("courses", "readwrite");
  const store = tx.objectStore("courses");
  store.put(course);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllCourses(): Promise<CourseRecord[]> {
  const db = await openDB();
  const tx = db.transaction("courses", "readonly");
  const store = tx.objectStore("courses");
  const req = store.getAll();
  return promisifyRequest<CourseRecord[]>(req);
}

// Helper: ensure courses are present; if empty, seed and re-read
export async function getAllCoursesEnsured(): Promise<CourseRecord[]> {
  let all = await getAllCourses();
  if (!all || all.length === 0) {
    await seedDefaultCoursesIfEmpty();
    all = await getAllCourses();
  }
  return all;
}

export async function clearCourses(): Promise<void> {
  const db = await openDB();
  const tx = db.transaction("courses", "readwrite");
  const store = tx.objectStore("courses");
  store.clear();
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function addCartItem(item: CartRecord): Promise<number> {
  const db = await openDB();
  const tx = db.transaction("shopping_cart", "readwrite");
  const store = tx.objectStore("shopping_cart");
  
  // First, delete any existing items for this course
  const index = store.index("course_id");
  const existingItems = await promisifyRequest<CartRecord[]>(index.getAll(item.course_id));
  
  for (const existingItem of existingItems) {
    if (typeof existingItem.cart_id === 'number') {
      await promisifyRequest(store.delete(existingItem.cart_id));
    }
  }

  // Then add the new item
  const req = store.add(item);
  const id = await promisifyRequest<number>(req);
  
  // Wait for transaction to complete
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  return id;
}

export async function getCartItems(): Promise<CartRecord[]> {
  const db = await openDB();
  const tx = db.transaction("shopping_cart", "readonly");
  const store = tx.objectStore("shopping_cart");
  const req = store.getAll();
  return promisifyRequest<CartRecord[]>(req);
}

export async function seedDefaultCoursesIfEmpty(): Promise<void> {
  const existing = await getAllCourses();
  if (existing && existing.length > 0) return;

  const descriptions = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const levels = [
    { title: "A1.1", price: 1000, duration: 1 },
    { title: "A1.2", price: 1000, duration: 1 },
    { title: "A2.1", price: 1000, duration: 1 },
    { title: "A2.2", price: 1000, duration: 1 },
    { title: "B1.1", price: 1500, duration: 2 },
    { title: "B1.2", price: 1500, duration: 2 },
    { title: "B2.1", price: 1500, duration: 2 },
    { title: "B2.2", price: 1500, duration: 2 },
    { title: "C1.1", price: 2000, duration: 2 },
    { title: "C1.2", price: 2000, duration: 2 },
  ];

  const promises: Promise<void>[] = [];
  levels.forEach((level, idx) => {
    const course: CourseRecord = {
      course_id: idx + 1,
      title: level.title,
      description: descriptions,
      image: "deutschkurs.jpg",
      price: level.price,
      duration: level.duration
    };
    promises.push(addCourse(course));
  });

  await Promise.all(promises);
}

export { openDB };
