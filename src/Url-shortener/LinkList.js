import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { config } from '../config';
import { UserContext } from '../UserContext';

function LinkList() {
  const { links, setLinks} = useContext(UserContext);
    const { user} = useContext(UserContext);

    useEffect(() => {
        fetchData();
      }, []);
    
      let fetchData = async () => {
        try {
          const linkList = await axios.get(`${config.api}/linklist/${user._id}`);
          setLinks(linkList.data);
        } catch (error) {
          alert("Error");
        }
      };

      
  let deleteUser = async (linkId) =>{
    try{
      await axios.delete(`${config.api}/delete/${linkId}`)
     alert("Link Deleted Successfully")
     fetchData()
    }
    catch (error){
      alert("Link Can't Deleted")
    }
  }


  return (
    <>
<div className="link-display">
        {
        links.map((link) => {
        return(
        <div className="box">
          <div className="inside_box" >
            <div className="card-header">Total Click :{link.count}</div>
            <div className="card-body text-secondary">
              <h4 className="card-title">
                <a
                target="_blank"
                href={`${config.api}/${link.shortUrl}`}
                > {config.api}/{link.shortUrl}
                </a>
              </h4>
              <p className="card-text">{link.longUrl}</p>
             
            </div>
           
          </div>
          <button onClick={() => deleteUser(link._id)} className ="navy_btn_link">
                        Remove
                      </button>
        </div>
        )
         })}
       </div>
       <Link to="/" className="red-green_btn ">Logout</Link>

   </>
  
  )
}

export default LinkList