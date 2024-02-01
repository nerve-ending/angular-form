const express = require('express');
const { getAllCourses, getCourseById } = require('./get-courses.route');
const { searchLessons } = require('./search-lessons.route');
const { getCourseCategories } = require('./course-categories.route');
const multer = require('multer');

const app = express();
const port = 6000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/course-categories').get(getCourseCategories);

app.post(
  '/api/thumbnail-upload',
  upload.single('file'),
  (req: any, res: any) => {
    res.send('Hello from Express server');
  }
);

app.listen(port, () => {
  console.log('server is running at 6000');
});
