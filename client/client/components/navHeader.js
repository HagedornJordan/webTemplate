const NavHeader = (props) => {
    const username = props.user?.name;
    console.log(username);
    return (
      <div className="flex justify-between min-w-full pl-4 pb-3 mb-5 bg-primary">
        <h1 className=" font-sans text-2xl font-semibold subpixel-antialiased">
          {" "}
          piDjango
        </h1>
        <div className="justify-self-end pr-4"> 
          {username && <h1 className=" font-sans text-1xl font-semibold subpixel-antialiased">Hello, {username}</h1> }
        </div>
      </div>
    );
  }
  
  export default NavHeader;