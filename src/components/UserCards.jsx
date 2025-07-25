import React from 'react'

function UserCards({ userData }) {
    const { firstName, lastName, age, profileURL, about, gender, skills } = userData
    return (

        <div className="card bg-gray-900 w-96 shadow-sm">
            <figure>
                <img
                    src={profileURL} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>  <span>  Age : {age}  </span>  {gender} </p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>

    )
}

export default UserCards
