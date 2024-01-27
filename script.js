document.addEventListener('DOMContentLoaded', () => {
    loadAppointments();
  });
  
  function loadAppointments() {
    axios.get('http://localhost:5000/api/appointments')
        .then(response => {
            const appointments = response.data;
            localStorage.setItem('appointments', JSON.stringify(appointments));
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
        const updatedAppointmentData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
        };
  
        axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, updatedAppointmentData)
            .then(response => {
                console.log('Appointment data updated successfully:', response.data);
                clearFormFields();
                loadAppointments();
            })
            .catch(error => {
                console.error('Error updating appointment data:', error);
            });
    } else {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
  
        const appointmentData = {
            username,
            email,
            phone,
        };
  
        axios.post('http://localhost:5000/api/appointments', appointmentData)
            .then(response => {
                console.log('Appointment data saved successfully:', response.data);
                document.getElementById('username').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';
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
    document.getElementById('appointmentId').value = '';
  }
  
  function displayAppointments(appointments) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
  
    appointments.forEach(appointment => {

        // console.log('Appointment ID:', appointment.id);
        const listItem = document.createElement('li');
        listItem.id = appointment.id;
        listItem.className = 'user-box';
        listItem.innerHTML = `
            <strong>Username:</strong> ${appointment.username}<br>
            <strong>Email:</strong> ${appointment.email}<br>
            <strong>Phone:</strong> ${appointment.phone}
            <button onclick="deleteAppointment('${appointment.id}')">Delete</button>
            <button onclick="editAppointment('${appointment.id}', '${appointment.username}', '${appointment.email}', '${appointment.phone}')">Edit</button>
        `;
  
        userList.appendChild(listItem);
    });
  }
  
  function deleteAppointment(id) {
    console.log('Appointment ID:', appointmentId);
  
    axios.delete(`http://localhost:5000/api/appointments/${id}`)
      .then(response => {
        console.log('Appointment data deleted successfully:', response.data);
        loadAppointments();
      })
      .catch(error => {
        console.error('Error deleting appointment data:', error.response);
      });
  }
  


  
  function editAppointment(id, username, email, phone) {
    document.getElementById('username').value = username;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('appointmentId').value = id;
  }
  