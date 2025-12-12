// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axiosInstance from "../../../components/axiosInstance";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();
    

//     const fetchProfile = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 setLoading(false);
//                 return;
//             }
//             const res = await axiosInstance.get("/auth/profile");

//             setUser(res.data.data);
//         } catch (err) {
//             console.error("Profile load failed:", err);
//             router.push("/login");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser, loading }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

// export function useUser() {
//     return useContext(UserContext);
// }



"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../components/axiosInstance";

const UserContext = createContext();


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
           const usersData = JSON.parse(localStorage.getItem("user"));

            console.log("user data   ==== =",usersData._id)
            if (!token) {
                // router.push("/login");
                setLoading(false);
                return;
            }
            
            const res = await axiosInstance.get(`/auth/${usersData._id}`);
            
            if (res.data.success) {
                setUser(res.data.data || res.data.user);
                // Update localStorage user data
                localStorage.setItem("user", JSON.stringify(res.data.data || res.data.user));
            } else {
                throw new Error("Failed to fetch profile");
            }
        } catch (err) {
            console.error("Profile load failed:", err);
            // Clear invalid token
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}