import React from 'react'
const Quizzes = ({quizzes}) => {
  return (
    <div>
<section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="-my-8 divide-y-2 divide-gray-100">
      {quizzes.map((obj)=>{
        return <div className="py-8 flex flex-wrap md:flex-nowrap" key={obj._id} id={obj._id}>
        <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
          <img src={obj.img} width={200} height={200}/>
        </div>
        <div className="md:flex-grow">
          <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
            {obj.title}
          </h2>
          <p className="leading-relaxed mb-3">{obj.desc}</p>
          <a role="button" href={`${process.env.NEXT_PUBLIC_HOST}/quiz/${obj.slug}?question=1`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Attempt Quiz
          </a>
        </div>
      </div>
      })}
      
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/allquiz`)
  let quizzes = await res.json()
  return {
    props: {quizzes}, // will be passed to the page component as props
  }
}

export default Quizzes