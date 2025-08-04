// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const submissionsFile = path.join(__dirname, 'submissions.json');

app.post('/submit-presentation', (req, res) => {
  const { name, university, status, presentation, title, abstract } = req.body;
  const entry = {
    name,
    university,
    status,
    presentation,
    title,
    abstract,
    timestamp: new Date().toISOString()
  };
  let submissions = [];
  if (fs.existsSync(submissionsFile)) {
    submissions = JSON.parse(fs.readFileSync(submissionsFile));
  }
  submissions.push(entry);
  fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
