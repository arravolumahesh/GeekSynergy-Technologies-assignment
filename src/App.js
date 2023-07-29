import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phoneNumber: '',
    profession: '',
  })

  const handleChange = e => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = () => {
    // Save the formData in local storage
    localStorage.setItem('userData', JSON.stringify(formData))
  }

  return (
    <div>
      <h2>User Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Profession:
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
          >
            <option value="">Select Profession</option>
            <option value="Engineer">Engineer</option>
            <option value="Doctor">Doctor</option>
            <option value="Teacher">Teacher</option>
            {/* Add other professions as needed */}
          </select>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

const Login = ({handleLogin}) => {
  const [loginData, setLoginData] = useState({
    name: '',
    password: '',
  })

  const handleChange = e => {
    const {name, value} = e.target
    setLoginData({...loginData, [name]: value})
  }

  const handleSubmit = () => {
    // Retrieve the saved user data from local storage
    const userData = JSON.parse(localStorage.getItem('userData'))

    if (
      userData &&
      userData.name === loginData.name &&
      userData.password === loginData.password
    ) {
      handleLogin(true)
    } else {
      alert('Invalid Credentials')
    }
  }

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={loginData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

const MovieList = () => {
  const [movieData, setMovieData] = useState([])

  useEffect(() => {
    // Fetch movie data from the API upon successful login
    fetch('https://hoblist.com/api/movieList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: 'movies',
        language: 'kannada',
        genre: 'all',
        sort: 'voting',
      }),
    })
      .then(response => response.json())
      .then(data => {
        setMovieData(data.result)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movieData.map(movie => (
          <li key={movie.id}>{movie.movie}</li>
        ))}
      </ul>
    </div>
  )
}

const CompanyInfo = () => (
  <div>
    <h2>Company Info</h2>
    <p>Company: Geeksynergy Technologies Pvt Ltd</p>
    <p>Address: Sanjayanagar, Bengaluru-56</p>
    <p>Phone: XXXXXXXXX09</p>
    <p>Email: XXXXXX@gmail.com</p>
  </div>
)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = status => {
    setIsLoggedIn(status)
  }

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/company-info">Company Info</Link>
          </li>
        </ul>
      </nav>

      <Route exact path="/" component={Signup} />
      <Route path="/login">
        <Login handleLogin={handleLogin} />
      </Route>
      <Route path="/movies">
        {isLoggedIn ? <MovieList /> : <h2>Please login to access this page</h2>}
      </Route>
      <Route path="/company-info" component={CompanyInfo} />
    </Router>
  )
}

export default App
