import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses, CourseRecord } from '../utils/db';

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '2rem',
  padding: '2rem',
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  backgroundColor: '#fff',
};

const imageContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '200px',
  overflow: 'hidden',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.3s ease-in-out',
};

const contentStyle: React.CSSProperties = {
  padding: '1.5rem',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#33373a',
  marginBottom: '0.5rem',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '0.875rem',
  color: '#666',
  marginBottom: '1rem',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const linkStyle: React.CSSProperties = {
  display: 'inline-block',
  color: '#6c96a4',
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: 600,
};

export default function CourseList() {
    const [courses, setCourses] = useState<CourseRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllCourses()
            .then(courses => {
                setCourses(courses);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load courses:', err);
                setError('Failed to load courses. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: '#dc3545' }}>{error}</div>;
    }

    return (
        <div>
            <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: 600, 
                color: '#33373a',
                marginBottom: '2rem',
                padding: '0 2rem'
            }}>
                Available Courses
            </h1>
            <div style={gridStyle}>
                {courses.map(course => (
                    <article key={course.course_id} style={cardStyle}>
                        <Link to={`/course/${course.course_id}`} style={{ textDecoration: 'none' }}>
                            <div style={imageContainerStyle}>
                                <img
                                    src={course.image.startsWith("/") ? course.image : `img/${course.image}`}
                                    alt={course.title}
                                    style={imageStyle}
                                />
                            </div>
                            <div style={contentStyle}>
                                <h2 style={titleStyle}>{course.title}</h2>
                                <p style={descriptionStyle}>{course.description}</p>
                                <span style={linkStyle}>More Info →</span>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
