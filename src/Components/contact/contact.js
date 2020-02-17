import React from "react";
import "./contact.scss";


const Contact = props => {
  
    return (
        <div
        className="contact">
        <div className="photo">
          <img alt=""></img>
        </div>
        <div
          className="data"
          onClick={() => props.readContact(props.contact._id)}
        >
          {props.contact.name} {props.contact.surname}
          <br></br>
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