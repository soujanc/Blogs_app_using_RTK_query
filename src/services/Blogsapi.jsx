import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  getDocs,
  doc,
  collection,
  serverTimestamp,
  getDoc,
  deleteDoc,
  updateDoc,
  
} from "firebase/firestore";
import { db } from "../firebase";
export const blogApi = createApi({
  reducerPath: "blogapi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      async queryFn() {
        try {
          const blogRef = collection(db, "blogs");
          const querySnapshot = await getDocs(blogRef);
          let blogs = [];
          querySnapshot?.forEach((doc) => {
            blogs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          return { data: blogs };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["Blog"], //automatic refetching
    }),
    fetchBlog: builder.query({
        async queryFn(id){
         
            try {
                console.log("djfdg")
                const decRef = doc(db,"blogs",id)
                const snapshot = await getDoc(decRef);
                return {data: snapshot.data() };
            } catch(err) {
                return { error:err }
            }
        }

        }),
    addBlog: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...data,
            timestamp: serverTimestamp(),
          });
        } catch (err) {
          return { error: err };
        }
        return { data: "ok" };
      },
      invalidatesTags: ["Blog"], //automatic refetching
    }),
    dleletBlog: builder.mutation({
      async queryFn(id) {
        try {
            console.log("hello")
          await deleteDoc(doc(db, "blogs", id));
          return { data: "ok" };
        } catch (error) {
          return { error: err };
        }
      },
      invalidatesTags: ["Blog"], //automatic refetching
    }),
    updateBlog: builder.mutation({
        async queryFn({id, data}){
       try {
       console.log("hello")

        await updateDoc(doc(db,"blogs",id),{
            ...data,
            timestamp: serverTimestamp()
        })
        return{data:"ok"}
       } catch (err) {
        return{error:err}
       }

        },
        invalidatesTags: ["Blog"],

    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useAddBlogMutation,
  useDleletBlogMutation,
  useFetchBlogQuery,
  useUpdateBlogMutation,
} = blogApi;
