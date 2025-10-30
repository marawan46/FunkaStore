import { Spinner } from "@material-tailwind/react";

export function Loading() {
     return (
          <div className="h-[100vh] w-[100vw] flex items-center justify-center filter opacity-55 bg-gray-500 fixed top-0 left-0 z-40">
               <Spinner className="h-12 w-12 relative z-50" />
          </div>
     );
}
