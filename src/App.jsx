import AppRouter from "./router/AppRouter";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./auth/authConfig";
import AuthProvider from "./auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "./features/loader/context/LoadingContext";
import { CompanyProvider } from "./features/company/contexts/CompanyContext";
import { GeneralPipelineProvider } from "./features/generalPipeline/contexts/GeneralPipelineContext";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <GeneralPipelineProvider>
          <LoadingProvider>
            <CompanyProvider>
              <div className="flex min-h-[100vh] w-[100%] flex-col bg-primaryBG font-segoe">
                <AppRouter />
                <ToastContainer />
              </div>
            </CompanyProvider>
          </LoadingProvider>
        </GeneralPipelineProvider>
      </AuthProvider>
    </MsalProvider>
  );
}

export default App;
