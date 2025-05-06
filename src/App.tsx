import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CityDetailsPage from "./pages/CityDetailsPage/CityDetailsPage";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.app}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city/:city" element={<CityDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
