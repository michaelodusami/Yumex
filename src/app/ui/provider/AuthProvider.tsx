"use client";
import { createContext, useState, useEffect } from "react";
import { supabase } from "@/app/lib/server";
const AuthContext = createContext<any | null>(null);
