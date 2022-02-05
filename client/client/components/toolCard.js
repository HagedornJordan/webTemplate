const ToolCard = (props) => {
    return (
      <div className="flex ml-4 mr-4 border-solid border-2 bg-white">
        {props.children}
      </div>
    );
  };
  
  export default ToolCard;