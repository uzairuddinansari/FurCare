const Pic = ({
  name,
  age,
  image,
  doctorType,
  deleteUser,
  updateUser,
}) => {
  return (
    <div className="card">
      <img src={image} alt={name} />

      <h2>{name}</h2>

      <p>Age: {age}</p>

      <p>Veterinarian: {doctorType}</p>

      <div className="card-buttons">
        <button onClick={updateUser}>
          Update
        </button>

        <button onClick={deleteUser}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Pic;