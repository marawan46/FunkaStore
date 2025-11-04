import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const useFetch = ({
     tableName,
     filter = null,
     condition = null,
     selectStatment = "*",
}) => {
     const [data, setData] = useState([]);
     const [error, setError] = useState(null);
     const [loading, setloading] = useState(true)
     useEffect(() => {
          async function getData() {
               let query = supabase.from(tableName).select(selectStatment);

               if (filter && condition) {
                    query = query.eq(filter, condition);
               }

               const { data, error } = await query;
               setData(data);
               setError(error);
               setloading(false)
          }

          getData();
     }, [tableName, filter, condition, selectStatment]);

     return [data, error,loading];
};
export default useFetch;
