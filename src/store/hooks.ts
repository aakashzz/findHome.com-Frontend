"use client"
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useCustomSelector = useSelector.withTypes<RootState>();
export const useCustomDispatch = useDispatch.withTypes<AppDispatch>();
