import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "./ui/components/ErrorBoundary";
import AppRoutes from "./ui/routes/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Source Sans 3", "Playfair Display"],
      },
    });
  }, []);

  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
