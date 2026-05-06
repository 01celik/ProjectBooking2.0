import beach from "../assets/beach.jpg";

function Surroundings() {
  return (
    <section
      className="surroundings"
      style={{ backgroundImage: `url(${beach})` }}
    >
      <div className="surroundings-content">
        <h2>Explore the surroundings</h2>
        <a href="#">Discover more</a>
      </div>
    </section>
  );
}

export default Surroundings;