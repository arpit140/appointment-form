function handleFormSubmit(event) {
    event.preventDefault()

    const username = document.getElementById('username').value 
    const email = document.getElementById('email').value 
    const phone = document.getElementById('phone').value 

    const user = {
        username: username,
        email: email,
        phone: phone,
    }
//**********save the object data in local Storage***********

    // var userList= JSON.parse(localStorage.getItem('userList')) || []
    // userList.push(user)

    // localStorage.setItem('userList',JSON.stringify(userList))
    axios.post('https://crudcrud.com/api/8d6a2fafce354ee1b2a0260e2c660634/appointment-data', user)
    .then(function (response) {
        console.log('Data sent to crudcrud.com', response.data)
        document.getElementById('username').value=''
        document.getElementById('email').value=''
        document.getElementById('phone').value=''

        fetchAndDisplayUserList()
    })
    .catch(function (error) {
        console.error('Error sending data to crudcrud.com', error)
    })


}

function fetchAndDisplayUserList() {
    axios.get('https://crudcrud.com/api/8d6a2fafce354ee1b2a0260e2c660634/appointment-data')
    .then(function(response) {
        console.log('Data recevied from crudcrud.com:',response.data)
        displayUserList(response.data)
    })
    .catch(function (error) {
        console.error('Error fetching data from crudcrud.com', error)
    })
}

function deleteEntry(index) {
    // var userList = JSON.parse(localStorage.getItem('userList')) || []
    // userList.splice(index, 1)
    // localStorage.setItem("userList",JSON.stringify(userList))
    // displayUserList()

    axios.delete(`https://crudcrud.com/api/8d6a2fafce354ee1b2a0260e2c660634/appointment-data/${userId}`)
    .then(function (response) {
        console.log('Data deleted from crudcrud.com:',response.data)
        fetchAndDisplayUserList()
    })
    .catch(function (error) {
        console.log('Error deleting data from crudcrud.com',error)
    })
}

function displayUserList() {
    // var userList =JSON.parse(localStorage.getItem('userList')) || []
    
    var ul =document.getElementById('userList')
    ul.innerHTML=''


    userList.forEach( function(user) {
        var li=document.createElement('li')
        li.textContent="username: " + user.username + ", Email: " + user.email + ", Phone: "+ user.phone
        li.className = "user-box"
        

        var deleteButton = document.createElement('button')
        deleteButton.textContent= "delete"
        deleteButton.onclick = function() {
            deleteEntry(user._id)
        }
        li.appendChild(deleteButton)
        ul.appendChild(li)
    })

}

fetchAndDisplayUserList()