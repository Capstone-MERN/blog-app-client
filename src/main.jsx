import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(<Main />);
