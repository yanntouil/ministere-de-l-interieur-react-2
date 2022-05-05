import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './i18n'
import './styles/tailwind.css'
import './styles/globals.scss';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Layout from './components/layout/Layout'
import Map from './pages/Map'



const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/map" exact element={<Map />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App;
