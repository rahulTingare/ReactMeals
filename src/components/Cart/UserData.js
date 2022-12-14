import React from 'react'


const UserData = (props) => {
    return (
      <form>
        <div className="classes.control">
          <label htmlFor="name"> Your Name</label>
          <input type="text" id="name"></input>
        </div>
        <div className="classes.control">
          <label htmlFor="street"> Street</label>
          <input type="text" id="street"></input>
        </div>
        <div className="classes.control">
          <label htmlFor="postal"> Postal Code</label>
          <input type="text" id="postal"></input>
        </div>
        <div className="classes.control">
          <label htmlFor="city"> City</label>
          <input type="text" id="city"></input>
        </div>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
      </form>
    );
  };
  
  export default UserData;
  