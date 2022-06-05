import { useEffect, useState } from "react";

function NavBar({ setCity, err, setErr }) {
  //vars
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);

  //Get city function
  function hendleGetCity(e) {
    e.preventDefault();

    const city = e.target.children.city.value;

    if (city) {
      if (city.match(/([A-Z])\w+/gi)) {
        const smallLettersCity = city.toLowerCase();

        setCity(smallLettersCity);
        setErr();

        console.log(city);
      } else {
        setErr("Enter latin letters without digits");
        console.log(err);
      }
    }

    e.target.reset();
  }

  //Nav bar function responsive
  const toggleNav = (e) => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);

  return (
    <nav className="navBar">
      {(toggleMenu || screenWidth > 500) && (
        <form onSubmit={hendleGetCity} className="navBar__form">
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Enter city name"
            required
            // pattern="/([A-Z])\w+/gi"
            // title="Enter latin letters without digits"
          />
          <button type="submit" className="navBar__searchBtn">
            <img src="./img/loupe.png" alt="loupe" />
          </button>
          <span className="err">{err}</span>
        </form>
      )}

      <button onClick={toggleNav} className="navBar__menuBtn">
        <img src="./img/icons8-menu.svg" alt="menu" />
      </button>
    </nav>
  );
}

export default NavBar;
