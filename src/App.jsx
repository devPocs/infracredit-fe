import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider } from "./features/loader/context/LoadingContext";
import { CompanyProvider } from "./features/company/contexts/CompanyContext";
import { GeneralPipelineProvider } from "./features/generalPipeline/contexts/GeneralPipelineContext";

function App() {
  return (
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
  );
}

export default App;
