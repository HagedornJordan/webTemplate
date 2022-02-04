const ToolCard = (props) => {
    return (
      <div className="flex ml-4 mr-4 border-solid border-2 border-black">
        {props.children}
      </div>
    );
  };
  
  export default ToolCard;