import { clearCourses, seedDefaultCoursesIfEmpty } from './db';

const reseed = async () => {
  try {
    await clearCourses();
    await seedDefaultCoursesIfEmpty();
    console.log('Successfully reseeded the courses data');
  } catch (error) {
    console.error('Failed to reseed courses:', error);
  }
};

reseed();