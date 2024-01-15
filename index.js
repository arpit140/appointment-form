

document.addEventListener('DOMContentLoaded', () => {
    // Load existing appointments from cloud
    loadAppointments();
  });

function loadAppointments() {
    // Make a GET request using Axios to retrieve existing appointments
    axios.get('https://crudcrud.com/api/febe2d2b3883436ba6b8ebf9031d648a/appointments')
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

    const appointmentId = document.getElementById('appointmentId').value;

    if (appointmentId) {
        // Edit existing appointment
        // Make a PUT request using Axios to update the appointment details
        const updatedAppointmentData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
        };

        axios.put(`https://crudcrud.com/api/febe2d2b3883436ba6b8ebf9031d648a/appointments/${appointmentId}`, updatedAppointmentData)
            .then(response => {
                console.log('Appointment data updated successfully:', response.data);
                // Clear the form fields and appointmentId after successful update
                clearFormFields();
                // Load appointments again to update the list
                loadAppointments();
            })
            .catch(error => {
                console.error('Error updating appointment data:', error);
            });
    } else {
        // Create new appointment
        // (Your existing code for creating a new appointment)
        
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
    axios.post('https://crudcrud.com/api/febe2d2b3883436ba6b8ebf9031d648a/appointments', appointmentData)
      .then(response => {
        console.log('Appointment data saved successfully:', response.data);
        //Clear the screen
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
}

function clearFormFields() {
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('appointmentId').value = ''; // Clear the appointmentId field
}
    


  function displayAppointments(appointments) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear existing list

    // Display each appointment on the screen
    appointments.forEach(appointment => {
      const listItem = document.createElement('li');
      listItem.id = appointment._id; // Assuming '_id' is a unique identifier from the API
      listItem.className='user-box'
      listItem.innerHTML = `
        <strong>Username:</strong> ${appointment.username}<br>
        <strong>Email:</strong> ${appointment.email}<br>
        <strong>Phone:</strong> ${appointment.phone}
        <button onclick="deleteAppointment('${appointment._id}')">Delete</button>
        <button onclick="editAppointment('${appointment._id}', '${appointment.username}', '${appointment.email}', '${appointment.phone}')">Edit</button>
      `;

      userList.appendChild(listItem);
    });
  }

  function deleteAppointment(appointmentId) {
    // Make a DELETE request using Axios
    axios.delete(`https://crudcrud.com/api/febe2d2b3883436ba6b8ebf9031d648a/appointments/${appointmentId}`)
      .then(response => {
        console.log('Appointment data deleted successfully:', response.data);

        // Load appointments again to update the list
        loadAppointments();
      })
      .catch(error => {
        console.error('Error deleting appointment data:', error);
      });
  }

  function editAppointment(id, username, email, phone) {
    // Populate the main registration form with user details
    document.getElementById('username').value = username;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;

    // Add a hidden input field to store the appointment id
    document.getElementById('appointmentId').value = id;
}