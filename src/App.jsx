import React from 'react'
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
    import Navbar from './components/Navbar'
    import Management from './pages/Management'
    import Registration from './pages/Registration'
    import Settings from './pages/Settings'
    import Insights from './pages/Insights'

    function App() {
      return (
        <Router>
          <Navbar />
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Management />} />
              <Route path="/cadastro" element={<Registration />} />
              <Route path="/configuracoes" element={<Settings />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </div>
        </Router>
      )
    }

    export default App
