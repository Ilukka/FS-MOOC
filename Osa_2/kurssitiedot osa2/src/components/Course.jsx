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
          <p> 
            {props.part.name} {props.part.exercises} 
          </p>
        </>
      )
    }
    

  const Content = ({ parts }) => {
    console.log("Content props: ", parts)
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    console.log("Total: ", total)
    return (
      <>
        <h4>
          Total of {total} exercises 
        </h4>
      </>
    )
  }
  
  const Course = ({ course }) => {
    console.log("Course props: ", course)
    return(
      <div>
        <Header course={course} />
        <Content parts={course.parts}/> 
        <Total course={course} />
      </div>
    )
  }
  
  export default Course