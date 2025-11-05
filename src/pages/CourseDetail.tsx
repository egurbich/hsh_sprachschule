import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllCourses, CourseRecord } from '../utils/db';

const containerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 2rem 2rem 2rem",
  boxSizing: "border-box",
};

const titleStyle: React.CSSProperties = {
  fontSize: "2rem",
  color: "#33373a",
  marginBottom: "1.5rem",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  maxHeight: 400,
  objectFit: "cover",
  borderRadius: 8,
  marginBottom: "2rem",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#444",
  marginBottom: "2rem",
};

const ctaContainerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginTop: "2rem",
};

const ctaTextStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#666",
};

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
    return <main style={containerStyle}>Loading...</main>;
  }

  if (error || !course) {
    return <main style={containerStyle}>
      <p style={{ color: '#dc3545' }}>{error || 'Course not found'}</p>
      <Link to="/courses" style={{ color: '#0d6efd', textDecoration: 'none' }}>Back to courses</Link>
    </main>;
  }

  return (
    <main style={containerStyle}>
      <h1 style={titleStyle}>{course.title}</h1>
      
      <img
        src={course.image.startsWith("/") ? course.image : `/img/${course.image}`}
        alt={course.title}
        style={imageStyle}
      />

      <div style={descriptionStyle}>{course.description}</div>

      <div style={ctaContainerStyle}>
        <Link
          to="/prices"
          style={{
            backgroundColor: '#6c96a4',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5a8292')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6c96a4')}
        >
          Pricelist
        </Link>
        <p style={ctaTextStyle}>
          To see price and choose the course please click here
        </p>
      </div>
    </main>
  );
};

export default CourseDetail;