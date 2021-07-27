import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from "./App";
import configureStore from "./store/store";

const store = configureStore();

export const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("root")
);
