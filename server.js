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
const eventsFile = path.join(__dirname, 'events.json');

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

app.get('/events', (req, res) => {
  let events = [];
  if (fs.existsSync(eventsFile)) {
    events = JSON.parse(fs.readFileSync(eventsFile));
  }
  res.json(events);
});

app.post('/add-event', (req, res) => {
  const { title, date, description } = req.body;
  const entry = { title, date, description };
  let events = [];
  if (fs.existsSync(eventsFile)) {
    events = JSON.parse(fs.readFileSync(eventsFile));
  }
  events.push(entry);
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
