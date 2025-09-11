import React from 'react'
import PropTypes from 'prop-types'
import TestImg from "../assets/test.jpg"

const Home = (props) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-6 p-6">

      {/* Heading */}
      <div className="w-full text-center">
        <h1 className="text-3xl font-bold">
          Welcome to the World of BrainArena
        </h1>
      </div>

      {/* Image */}
      <div className="w-full flex justify-center">
        <img
          className="h-96 w-auto object-contain rounded-2xl shadow-lg"
          src={TestImg}
          alt="exam"
        />
      </div>

      {/* Description */}
      <div className="w-full max-w-2xl text-center text-gray-300">
        <p>
          BrainArena is your go-to platform for creating and managing online exams effortlessly. With a user-friendly interface and powerful features, we aim to enhance the learning experience for both educators and students.
        </p>
      </div>

      <div>
        <p>Here You can create a Exam with your custom options and time also . Schedule a  interview</p>
      </div>
    </div>
  )
}

Home.propTypes = {
  // You can define props here if needed
}

export default Home
