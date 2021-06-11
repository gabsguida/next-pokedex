function Card({ children, className }) {
  return (
    <div className={`${className != undefined ? className : ''} border border-gray-400 rounded-xl my-3`} >
      {children}
    </div>
  );
}

export default Card;
