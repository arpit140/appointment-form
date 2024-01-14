// index.js

document.addEventListener('DOMContentLoaded', () => {
    // Load existing appointments from crudcrud.com
    loadAppointments();
  });
  
  function loadAppointments() {
    // Make a GET request using Axios to retrieve existing appointments
    axios.get('https://crudcrud.com/api/67c0074396a94c8a87c725bd5d2966b7/appointments')
      .then(response => {
        const appointments = response.data;
        
        // Save appointments to local storage
        localStorage.setItem('appointments', JSON.stringify(appointments));
  
        // Display appointments on the screen
        displayAppointments(appointments);
      })
      .catch(error => {
        console.error('Error loading appointments:', error);
      });
  }
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get form data
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    // Create an object with the form data
    const appointmentData = {
      username,
      email,
      phone,
    };
  
    // Make a POST request using Axios to save the new appointment
    axios.post('https://crudcrud.com/api/67c0074396a94c8a87c725bd5d2966b7/appointments', appointmentData)
      .then(response => {
        console.log('Appointment data saved successfully:', response.data);
        document.getElementById('username').value=''
        document.getElementById('email').value=''
        document.getElementById('phone').value=''
  
        // Load appointments again to update the list
        loadAppointments();
      })
      .catch(error => {
        console.error('Error saving appointment data:', error);
      });
  }
  
  function displayAppointments(appointments) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear existing list
  
    // Display each appointment on the screen
    appointments.forEach(appointment => {
      const listItem = document.createElement('li');
      listItem.id = appointment._id; // Assuming '_id' is a unique identifier from the API
      listItem.innerHTML = `
        <strong>Username:</strong> ${appointment.username}<br>
        <strong>Email:</strong> ${appointment.email}<br>
        <strong>Phone:</strong> ${appointment.phone}
        <button onclick="deleteAppointment('${appointment._id}')">Delete</button>
      `;
  
      userList.appendChild(listItem);
    });
  }
  
  function deleteAppointment(appointmentId) {
    // Make a DELETE request using Axios
    axios.delete(`https://crudcrud.com/api/67c0074396a94c8a87c725bd5d2966b7/appointments/${appointmentId}`)
      .then(response => {
        console.log('Appointment data deleted successfully:', response.data);
  
        // Load appointments again to update the list
        loadAppointments();
      })
      .catch(error => {
        console.error('Error deleting appointment data:', error);
      });
  }
  