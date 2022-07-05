import React from 'react'
import Question from "../../models/Question"
const MyQuiz = ({question}) => {
  return (
    <div>
        <h1>Question {} of {}</h1>
    </div>
  )
}

export async function getServerSideProps(context) {
  let questions = await Question.find({qslug: context.query.quiz})
  console.log(questions.length === Number(context.query.question))
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default MyQuiz