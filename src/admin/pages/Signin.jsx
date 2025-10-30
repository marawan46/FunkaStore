import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export function Signin() {
  const navigaite = useNavigate()
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [credentials,setCred] = useState({email:"",password:""})


    const handleAuth = async ()=>{//get session

        const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
        })
        console.log(data,error)
        
            
    }
  return (
    <section className="flex relative justify-center text-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 items-center p-8">
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg max-w-md sm:min-w-96 py-10 px-5">
        <Typography variant="h3" color="blue-gray" className="mb-2 font-title font-extrabold">
          تسجيل دخول 
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
تسجيل الدخول لادارة صفحة رمز ليالي
        </Typography>
        <form action="#" className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              value={credentials.email}
              onChange={(e)=>setCred({...credentials, email:e.target.value})}
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              value={credentials.password}
              onChange={(e)=>setCred({...credentials, password:e.target.value})}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button className="bg-blue-300 mt-6" size="lg" onClick={handleAuth} fullWidth>
            تسجيل
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Signin;