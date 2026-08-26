import "../style/grooming.css";
import dog from "../assets/dog.jpg";

const Grooming = () => {

  return (
    <section className="grooming-section">


      <div
        className="grooming-image"
        style={{
          backgroundImage:`url(${dog})`
        }}
      />


      <div className="grooming-box">


        <div className="content">


          <span>
            FUREVERCARE / GROOMING
          </span>


          <h1>
            GROOMING
            <br/>
            <i>with love & care.</i>
          </h1>


          <p>
            Professional grooming that keeps your pet clean,
            healthy and feeling their best.
          </p>
          
        </div>


      </div>


    </section>
  )
}


export default Grooming;