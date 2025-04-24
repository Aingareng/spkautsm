import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
