
const Header = (props) => {
  console.log("Header props: ", props.course.name)  
  return (
    <>
      <h1>
        {props.course.name}
      </h1>
    </>
  )
}

const Part = (props) => {
  console.log("Part props: ", props.part.name, props.part.exercises)
    return (
    <> 
    <p> {props.part.name} {props.part.exercises} </p>
    </>
  )
}


const Content = (props) => {
  console.log("Content props: ", props.parts)
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  console.log("Total props: ", props)
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/> 
    </div>
  )
}

export default App



