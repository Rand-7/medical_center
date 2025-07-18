import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// ✅ استيراد Redux Provider و store
import { Provider } from "react-redux";
import store from "./store/store";

// إنشاء ثيم مخصص (اختياري)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // اللون الأساسي
    },
    secondary: {
      main: "#f50057", // اللون الثانوي
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ لف التطبيق داخل Provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
