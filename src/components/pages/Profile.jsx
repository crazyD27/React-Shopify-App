import React from 'react';
import MenuBar from '../navbar/Navbar';

function Profile() {
  return (
    <div className="profile p-4">
        <MenuBar />
        <form className="profile-form d-flex flex-wrap justify-content-between mt-4">
            <div className="input-container d-flex flex-column mb-4">
                <label>Full name</label>
                <input type="text" />
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Last name</label>
                <input type="text" />
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Occupation</label>
                <input type="text" />
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Email</label>
                <input type="email" />
            </div>
            <div className="input-container text-container d-flex flex-column mb-4">
                <label>About me</label>
                <textarea name="" id="" rows="5"></textarea>
            </div>
            <div className="input-container d-flex flex-column mb-4">
                <label>Website</label>
                <input type="text" />
            </div>
        </form>
        <div className="buttons d-flex">
            <button className='button button-blue'>Update Profile</button>
            <button className='button ms-4'>Reset</button>
        </div>
    </div>
  )
}

export default Profile