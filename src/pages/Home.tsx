import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses, CourseRecord } from "../utils/db";

// link colors for Home headings and course links (reverted to original darker color)
const navLinkColor = '#33373a';
const navLinkHover = '#565c61';

const containerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "0 2rem 2rem 2rem",
  boxSizing: "border-box",
};

const heroStyle: React.CSSProperties = {
  width: "100%",
  height: 420,
  overflow: "hidden",
  borderRadius: 8,
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const titleStyle: React.CSSProperties = {
  marginTop: "1.25rem",
  marginBottom: "0.5rem",
  fontSize: "2rem",
  lineHeight: 1.1,
  color: navLinkColor,
};

const descStyle: React.CSSProperties = {
  color: "#444",
  fontSize: "1rem",
  lineHeight: 1.6,
  marginBottom: "2rem",
};

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
    <main style={containerStyle}>
      <section style={heroStyle}>
        {/* free-to-use photo placeholder from Unsplash */}
        <img
          src="img/home_1.jpg"
          alt="Classroom or language learning scene"
          style={imgStyle}
        />
      </section>

      <h1 style={titleStyle}>Welcome to HsH Sprachschule</h1>

      <p style={descStyle}>
        Discover a warm and engaging place to learn German. We offer comprehensive German
        courses for all proficiency levels, from A1.1 to C1.2. Our courses are
        designed for practical communication, confidence building, and real
        progress. Join a community of learners, explore cultural insights, and
        grow your language skills with friendly, experienced instructors who will
        guide you through every step of your German learning journey.
      </p>

  {/* separator line matching navbar color */}
  <div style={{ height: 1, backgroundColor: '#6c96a4ff', margin: '1.5rem 0' }} aria-hidden />

      {/* The most popular courses block */}
      <div style={{ marginTop: "1.5rem" }}>
  <h2 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", color: navLinkColor }}>The most popular courses</h2>

        <div
          style={{
            display: "grid",
            // auto-fit makes the grid responsive: cards will wrap and fill available space
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {popular.map((course) => (
            <article
              key={course.course_id}
              style={{
                  border: "1px solid rgba(222, 235, 239, 1)",
                  borderRadius: 8,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: "#fff",
                  minHeight: 330,
                }}
            >
              <div>
                <h3 style={{ margin: "0 0 8px 0", fontSize: "1rem" }}>{course.title}</h3>
                <div style={{ width: "100%", height: 270, overflow: "hidden", borderRadius: 6, marginBottom: 8 }}>
                  <Link to={`/course/${course.course_id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <img
                      src={course.image.startsWith("/") ? course.image : `img/${course.image}`}
                      alt={course.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </Link>
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "#444",
                    fontSize: "0.95rem",
                    lineHeight: 1.35,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as any,
                  }}
                >
                  {course.description}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <Link
                  to={`/course/${course.course_id}`}
                  style={{ color: navLinkColor, textDecoration: "none", fontWeight: 600, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = navLinkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = navLinkColor)}
                >
                  More info
                </Link>
                <Link
                  to="/prices"
                  style={{ color: navLinkColor, textDecoration: "none", fontWeight: 600, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = navLinkHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = navLinkColor)}
                >
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