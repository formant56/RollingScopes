import React from 'react';

interface FormDataProps {
  item: {
    name: string;
    age: number;
    email: string;
    gender: string;
    password: string;
    country: string;
    img: string;
  };
}

const FormData: React.FC<FormDataProps> = ({ item }) => {
  return (
    <div>
      <img className="item__img" src={item.img} />
      <div className="item__content">
        <p>
          <span>Name:</span> {item.name}
        </p>
        <p>
          <span>Age:</span> {item.age}
        </p>
        <p>
          <span>Email:</span> {item.email}
        </p>
        <p>
          <span>Gender:</span> {item.gender}
        </p>
        <p>
          <span>Country:</span> {item.country}
        </p>
        <p>
          <span>Password:</span> {item.password}
        </p>
      </div>
    </div>
  );
};
export default FormData;
