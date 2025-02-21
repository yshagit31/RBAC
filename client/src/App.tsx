import {
  AuthBindings,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import { Dashboard } from "./pages/dashboard";

import {
  UserCreate,
  UserEdit,
  UserList,
  UserShow,
} from "./pages/users";
import { Login } from "./pages/login";
import { parseJwt } from "./utils/parse-jwt";
import { profile } from "console";
import Register from "./pages/register";
import { useState,useEffect } from "react";
import { CustomSider } from "./components/header/CustomSider";
import {logo,yariga} from "./assets"
import { useThemedLayoutContext } from "@refinedev/mui";
import { PeopleAltOutlined } from "@mui/icons-material";
import DashboardIcon from '@mui/icons-material/Dashboard';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  
  // const [role,setRole]=useState("");

  // useEffect(() => {
  //   console.log("Updated role:", role); 
  // }, [role]); 

  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      console.log("Updated user from localStorage:", user);
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const authProvider: AuthBindings = {
    login: async ({ credential , email, password}: { credential?: string; email?: string; password?: string }) => {
      if (credential) { 
        const profileObj = credential ? parseJwt(credential) : null;
        // const profileObj = parseJwt(credential);
        // console.log(profileObj);
    
      if(profileObj)
      {
        try{
        // const response=await fetch('http://localhost:8000/api/v1/users/google' ,{
        const response=await fetch('http://localhost:8000/api/register/google' ,{
            method:'POST',
            headers:{ 'Content-Type': 'application/json'},
            body:JSON.stringify({
              ...profileObj,
              avatar:profileObj.picture,
            })
        })
        if (!response.ok) {
          console.error("Failed to save user data:", await response.text());
          return { success: false };
        }
        const data= await response.json();
        // console.log(data);
        // setRole(data?.role || "");
        // console.log(role);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            ...data,
            avatar: profileObj.picture,
          })
        );
     
        // const savedUser = localStorage.getItem("user");
        // console.log("Retrieved user from localStorage:", savedUser);

        localStorage.setItem("token", `${credential}`); 
        // console.log()

        // const savedToken = localStorage.getItem("token");
        // console.log("Retrieved token from localStorage:", savedToken);
        return {
          success: true,
          redirectTo: "/",
        };
      } catch (error) {
        console.error("Error during login:", error);
        return { success: false };
      }
    }}

    if (email && password) {
      try {
        const response = await fetch("http://localhost:8000/api/checklogin/val", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          console.error("Failed to authenticate user:", await response.text());
          return { success: false };
        }

        const data = await response.json();
        // console.log(data);
        // setRole(data?.role || "");
        // console.log(role);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data);
        // console.log("User saved:", data);
        // console.log("Token saved:", data);
        return { success: true, redirectTo: "/" };
      } catch (error) {
        console.error("Error during email/password login:", error);
        return { success: false };
      }
    }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      // console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      // console.log(user);
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  const { siderCollapsed } = useThemedLayoutContext();

  console.log("collapsed",siderCollapsed);

  useEffect(()=>{
    console.log("collapsed",siderCollapsed);
  },[siderCollapsed])

  const MyTitle: React.FC = () => (

    // <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    //   <img src={logo} alt="Logo" style={{ height: "32px" }} />
    //   <span style={{ fontSize: "25px", fontWeight: 540 }}>Yariga</span>
    // </div>
    <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: siderCollapsed ? "center" : "flex-start",
      marginLeft: siderCollapsed ? "15px !important" : "0 !important",
      gap: siderCollapsed ? "0" : "20px",
      width: "100%",
    }}
  >
    <img src={logo} alt="Logo" style={{ height: "32px" }} />
    {!siderCollapsed && (
      <span style={{ fontSize: "25px", fontWeight: 540 }}>Yariga</span>
    )}
  </div>
  );

  const onSiderCollapse = (collapsed: boolean) => {
    localStorage.setItem("siderCollapsed", JSON.stringify(collapsed));
  };

  const initialSiderCollapsed = JSON.parse(localStorage.getItem("siderCollapsed") || "false");

  

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("http://localhost:8000/api/v1")}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    icon: <DashboardIcon></DashboardIcon> ,
                    
                  },
                  {
                    name: "users",
                    list: "/users",
                    icon:<PeopleAltOutlined></PeopleAltOutlined>,
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "5b3OYY-Iy0LTd-k4VX9l",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 
                        Title={MyTitle}  Header={Header}
                        initialSiderCollapsed={initialSiderCollapsed}
                        onSiderCollapsed={onSiderCollapse}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                     <Route path="/">
                            <Route index element={<Dashboard/>} />
                           <Route path="*" element={<ErrorComponent />} />
                      </Route>
                    <Route path="/users">
                      {/* <Route index element={<UserList role={role} />} /> */}
                      <Route index element={<UserList/>} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
