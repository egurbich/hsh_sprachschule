import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseList() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    <Link to="/courses/course-1" className="text-blue-600 hover:underline">Course 1: Introduction to React</Link>
                </li>
                <li>
                    <Link to="/courses/course-2" className="text-blue-600 hover:underline">Course 2: Advanced React Patterns</Link>
                </li>
                <li>
                    <Link to="/courses/course-3" className="text-blue-600 hover:underline">Course 3: State Management with Redux</Link>
                </li>
            </ul>
        </div>
    );
}
