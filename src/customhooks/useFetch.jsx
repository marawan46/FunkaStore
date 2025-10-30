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

     useEffect(() => {
          async function getData() {
               let query = supabase.from(tableName).select(selectStatment);

               if (filter && condition) {
                    query = query.eq(filter, condition);
               }

               const { data, error } = await query;
               setData(data);
               setError(error);
          }

          getData();
     }, [tableName, filter, condition, selectStatment]);

     return [data, error];
};
export default useFetch;
