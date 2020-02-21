import React from "react";
import "./contact.scss";


const Contact = props => {
  
    return (
        <div
        className="contact">
        <div className="icon">
          <i className="far fa-address-book"></i>
        </div>
        <div
          className="data"
          onClick={() => props.readContact(props.contact._id)}
        >
          {props.contact.name} <br></br> {props.contact.surname}
          
        </div>

        <div className="menu active">
          <button className="drop-down">
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <div className="drop-down-content">
            <div className="Read">
              <div
                className="block"
                onClick={() => props.readContact(props.contact._id)}
              >
                Read
              </div>
            </div>
            <div className="name">
              <div
                className="block"
                onClick={() => props.editContact(props.contact._id)}
              >
                Edit
              </div>
            </div>
            <div
              className="block"
              onClick={() => props.delete(props.contact._id)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    );
  
}



export default Contact;