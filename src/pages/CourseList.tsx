import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses, CourseRecord } from '../utils/db';

/*
    File: pages/CourseList.tsx
    Purpose: List all available courses in a responsive grid.
    How: Fetches courses from IndexedDB and renders cards linking to CourseDetail.
    Props: none
    Hooks: useState, useEffect
    External: react-router-dom Link; utils/db getAllCourses
*/

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
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="heading-primary">
                Available Courses
            </h1>
            <div className="course-list-grid">
                {courses.map(course => (
                    <article key={course.course_id} className="course-card">
                        <Link to={`/course/${course.course_id}`} className="link-reset">
                            <div className="course-card-image-container">
                                <img
                                    src={course.image.startsWith("/") ? course.image : `/img/${course.image}`}
                                    alt={course.title}
                                    className="course-card-image"
                                />
                            </div>
                            <div className="course-card-content">
                                <h2 className="course-card-title">{course.title}</h2>
                                <p className="course-card-description">{course.description}</p>
                                <span className="course-card-link">More Info →</span>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
