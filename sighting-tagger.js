const { useState } = React;

const species = [
  {
    id: 1,
    name: "Tiger",
    scientificName: "Panthera tigris",
    location: "Zone A"
  },
  {
    id: 2,
    name: "Elephant",
    scientificName: "Elephas maximus",
    location: "Zone B"
  },
  {
    id: 3,
    name: "Leopard",
    scientificName: "Panthera pardus",
    location: "Zone C"
  },
  {
    id: 4,
    name: "Deer",
    scientificName: "Axis axis",
    location: "Zone D"
  }
];

function SpeciesCard({ animal }) {

  // Each SpeciesCard has its OWN state
  const [isTagged, setIsTagged] = useState(false);

  const toggleTag = () => {
    setIsTagged(previous => !previous);
  };

  return (
    <div
      className="card"
      data-testid={`species-card-${animal.id}`}
    >

      <h2>{animal.name}</h2>

      <p>
        <strong>Scientific Name:</strong>{" "}
        {animal.scientificName}
      </p>

      <p>
        <strong>Location:</strong>{" "}
        {animal.location}
      </p>

      <button
        className={isTagged ? "tagged" : ""}
        onClick={toggleTag}
        aria-pressed={isTagged}
      >
        {isTagged ? "✓ Tagged" : "Tag Sighting"}
      </button>

      {isTagged && (
        <div
          className="success"
          data-testid={`tag-status-${animal.id}`}
        >
          Sighting Tagged Successfully
        </div>
      )}

    </div>
  );
}

function SightingTagger() {

  return (
    <div className="container">

      <h1>
        🐾 Wildlife Census Sighting Tagger
      </h1>

      <p className="subtitle">
        Field team members can tag animal sightings
        independently.
      </p>

      <div className="cards">

        {species.map(animal => (
          <SpeciesCard
            key={animal.id}
            animal={animal}
          />
        ))}

      </div>

    </div>
  );
}

const root =
  ReactDOM.createRoot(
    document.getElementById("root")
  );

root.render(
  <SightingTagger />
);