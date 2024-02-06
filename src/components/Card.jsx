import React from 'react';

const FancyCard = ({ title, description, price, imgSrc }) => {
  return (
    <div className="card" style={styles.card}>
      <img src={imgSrc} className="card-img-top" alt={title} style={styles.image} />
      <div className="card-body">
        <h5 className="card-title" style={styles.title}>{title}</h5>
        <p className="card-text" style={styles.description}>{description}</p>
        <p className="card-text" style={styles.price}>Price: ${price}</p>
        <button className="btn btn-primary" style={styles.button}>Add To Cart</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: 'none',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    maxWidth: '300px',
    margin: 'auto',
    transition: 'transform 0.3s ease',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    height: '200px',
    objectFit: "center",
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#666',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default FancyCard;
