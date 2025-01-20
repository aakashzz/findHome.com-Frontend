"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { RootState, store } from "../store/store";

export default function StoreProvider({children}: {children: React.ReactNode}) {
   const storeRef = useRef<RootState>(null);
   if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = store.getState();
   }

   return <Provider store={store }>{children}</Provider>;
}
