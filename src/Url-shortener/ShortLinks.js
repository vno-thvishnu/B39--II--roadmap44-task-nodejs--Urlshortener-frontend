import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import { UserContext } from "../UserContext";
import LinkList from "./LinkList";

function ShortLinks() {
  const { user} = useContext(UserContext);
  const { links, setLinks} = useContext(UserContext);
  const navigate = useNavigate();

  // console.log(user._id);
  const formik = useFormik({
    initialValues: {
        "longUrl": "",
        "userId":`${user._id}`,
    },
    onSubmit: async (values) => {
      try {
       const newLink = await axios.post(`${config.api}/create_link`, values);
        alert("link created");
        setLinks([...links,newLink.data])
        formik.resetForm();
      } catch (error) {
        alert("link does't created");
      }
    },
  });

  return (
  <>
   <div className="container_urlone">

   <div className="container_url">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">URL Shortener</h1>
        </div>
      </div>
<form onSubmit={formik.handleSubmit}>
<div >    
<div className="inputtags">
                <div className="form-group">
                  <input
                    name="longUrl"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.longUrl}
                    type={"text"}
                    placeholder="Enter your long URL..."
                    className="form-controling"/>
                </div>
                <div className="col-lg-1">
                <div className="form-group">
                  <input type={"submit"} className="red-green_btn" />
                </div>
              </div>
              </div>


            
          </div>
          </form>
    <LinkList />

    </div>
   </div>

  </>
  );
}

export default ShortLinks;
