window.addEventListener('load', e => {
  const ROOT = document.getElementById('root')
  const PRE_RENDERED = document.querySelector('.user-0')

  const fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(resp => {
        resp.forEach((user, i) => {
          console.log('called', user)
          ROOT.innerHTML = ROOT.innerHTML + `
        <div class='user-${i}'>
          <h3>User no. ${i}</h3>
          <div>Name: ${user.name}</div>
          <div>Username: ${user.username}</div>
          <div>Website: ${user.website}</div>
          <div>Phone: ${user.phone}</div>
          <div>Email: ${user.email}</div>
          <div>Company name: ${user.company.name}</div>
          <div>City: ${user.address.city}</div>
          <hr/>
        </div>
      `
        })
      })
      .catch(e => console.log(e))
  }

  if (!PRE_RENDERED) fetchUsers()
})
