import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard"; // Adjusted to match your casing
import { Home } from "./pages/Home";
import { SharePage } from "./pages/SharePage"; // Import the new page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/:shareLink" element={<SharePage />} /> {/* New route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;