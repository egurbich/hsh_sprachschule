import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses, CourseRecord } from "../utils/db";

/*
  File: pages/Home.tsx
  Purpose: Homepage with hero image and a curated list of popular courses.
  How: Loads all courses from IndexedDB, filters/orders a fixed set (1,5,7),
       and renders summary cards with links to details and pricelist.
  Props: none
  Hooks: useState, useEffect
  External: react-router-dom Link; utils/db getAllCourses
*/

const Home: React.FC = () => {
  const [popular, setPopular] = useState<CourseRecord[]>([]);

  useEffect(() => {
    let mounted = true;
    getAllCourses()
      .then((all) => {
        if (!mounted) return;
        const ids = [1, 5, 7];
        const filtered = all.filter((c) => ids.includes(c.course_id));
        // keep original order [1,5,7]
        const ordered = ids.map((id) => filtered.find((f) => f.course_id === id)).filter(Boolean) as CourseRecord[];
        setPopular(ordered);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Failed to load courses from IndexedDB:", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="container">
      <section className="hero-image">
        <img
          src="/img/home_1.jpg"
          alt="Classroom or language learning scene"
        />
      </section>

      <h1 className="home-title">Welcome to HsH Sprachschule</h1>

      <p className="home-description">
        Discover a warm and engaging place to learn German. We offer comprehensive German
        courses for all proficiency levels, from A1.1 to C1.2. Our courses are
        designed for practical communication, confidence building, and real
        progress. Join a community of learners, explore cultural insights, and
        grow your language skills with friendly, experienced instructors who will
        guide you through every step of your German learning journey.
      </p>

      <div className="separator" aria-hidden />

      <div className="mt-lg">
        <h2 className="heading-secondary">The most popular courses</h2>

        <div className="popular-courses-grid">
          {popular.map((course) => (
            <article key={course.course_id} className="popular-course-card">
              <div>
                <h3>{course.title}</h3>
                <div className="popular-course-image">
                  <Link to={`/course/${course.course_id}`} className="link-reset" style={{ display: 'block', width: '100%', height: '100%' }}>
                    <img
                      src={course.image.startsWith("/") ? course.image : `/img/${course.image}`}
                      alt={course.title}
                    />
                  </Link>
                </div>

                <p className="popular-course-description">
                  {course.description}
                </p>
              </div>

              <div className="popular-course-links">
                <Link to={`/course/${course.course_id}`} className="course-link">
                  More info
                </Link>
                <Link to="/prices" className="course-link">
                  Pricelist
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;