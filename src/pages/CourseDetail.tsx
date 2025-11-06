import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllCourses, CourseRecord } from '../utils/db';

/*
  File: pages/CourseDetail.tsx
  Purpose: Display details of a single course.
  How: Reads courseId from URL params, fetches courses from IndexedDB,
       finds the matching course, and renders its content with navigation.
  Props: none (courseId comes from route params)
  Hooks: useParams, useState, useEffect
  External: react-router-dom (useParams, Link); utils/db getAllCourses
*/

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadCourse = async () => {
      try {
        const courses = await getAllCourses();
        if (!mounted) return;

        const found = courses.find(c => c.course_id === Number(courseId));
        if (found) {
          setCourse(found);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load course details');
          console.error('Error loading course:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      mounted = false;
    };
  }, [courseId]);

  if (loading) {
    return <main className="container loading">Loading...</main>;
  }

  if (error || !course) {
    return <main className="container">
      <p className="error">{error || 'Course not found'}</p>
      <Link to="/courses" className="link-primary">Back to courses</Link>
    </main>;
  }

  return (
    <main className="container">
      <h1 className="heading-primary">{course.title}</h1>
      
      <img
        src={course.image.startsWith("/") ? course.image : `/img/${course.image}`}
        alt={course.title}
        className="course-detail-image"
      />

      <div className="course-detail-description">{course.description}</div>

      <div className="cta-container">
        <Link to="/prices" className="btn-primary">
          Pricelist
        </Link>
        <p className="cta-text">
          To see price and choose the course please click here
        </p>
      </div>
    </main>
  );
};

export default CourseDetail;