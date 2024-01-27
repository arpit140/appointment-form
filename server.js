
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors')
const app = express();
const port = 5000;

const sequelize = new Sequelize('appointments-trial', 'root', '7488552785aA@', {
  host: 'localhost',
  dialect: 'mysql',
});

const Appointment = sequelize.define('appointment', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
});

sequelize.sync()
  .then(() => {
    console.log('Database and table created!');
  })
  .catch(err => console.error('Error syncing database:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.get('/api/appointments', (req, res) => {
  Appointment.findAll()
    .then(appointments => {
      res.json(appointments);
    })
    .catch(err => {
      console.error('Error retrieving appointments:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/api/appointments', (req, res) => {
  const { username, email, phone } = req.body;

  Appointment.create({
    username,
    email,
    phone,
  })
    .then(appointment => {
      res.json(appointment);
    })
    .catch(err => {
      console.error('Error creating appointment:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, phone } = req.body;

  Appointment.update({
    username,
    email,
    phone,
  }, {
    where: {
      id,
    },
  })
    .then(() => {
      res.send('Appointment updated successfully');
    })
    .catch(err => {
      console.error('Error updating appointment:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;

  Appointment.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.send('Appointment deleted successfully');
    })
    .catch(err => {
      console.error('Error deleting appointment:', err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
