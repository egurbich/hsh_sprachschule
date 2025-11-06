import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCourse, CourseRecord } from '../utils/db';

const AddCourse: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: 'deutschkurs.jpg',
    price: '',
    duration: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim()) {
      setError('Course title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Course description is required');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Price must be a positive number');
      return;
    }
    if (!formData.duration || Number(formData.duration) <= 0) {
      setError('Duration must be a positive number');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a unique course_id by getting timestamp
      const courseId = Date.now();

      const newCourse: CourseRecord = {
        course_id: courseId,
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image || 'deutschkurs.jpg',
        price: Number(formData.price),
        duration: Number(formData.duration),
      };

      await addCourse(newCourse);
      
      // Navigate to courses page after successful creation
      navigate('/courses');
    } catch (err) {
      console.error('Failed to add course:', err);
      setError('Failed to add course. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <div className="container">
      <h1 className="heading-primary">Add New Course</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Course Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="e.g., A1.1, B2.2, C1.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Course Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            className="form-textarea"
            rows={6}
            placeholder="Enter course description..."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price (€) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-input"
              placeholder="1000"
              min="0"
              step="50"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration" className="form-label">
              Duration (months) <span className="required">*</span>
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="form-input"
              placeholder="1"
              min="1"
              max="12"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Image Filename
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-input"
            placeholder="deutschkurs.jpg"
          />
          <small className="form-hint">
            Leave as default or enter a filename from the /public/img/ folder
          </small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
