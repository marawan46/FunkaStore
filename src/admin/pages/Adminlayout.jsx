import React, { useEffect, useState } from "react";
import Signin from "./Signin";
import { Outlet } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const Adminlayout = () => {
     const [userAuth, setUserAuth] = useState(false);
try{      
     
     useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                
                
                //console.log(session);       
                setUserAuth(session?.user ?? null);

            });

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUserAuth(session?.user ?? null);
            });

            return () => subscription.unsubscribe();
        }, []);
        
}catch(error){
    console.log(error)
}
//|| userAuth.app_metadata.role !== 'admin'

     if (!userAuth ) return <Signin />;
     return <div><Outlet /></div>;
};

export default Adminlayout;
