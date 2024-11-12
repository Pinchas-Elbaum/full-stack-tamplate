import Link_nav_bar from "../../components/Link_nav_bar"

const Header = () => {
  return (
    <>
    <header>
      <h1>Business card app</h1>
      <ul>
        <li>
          <Link_nav_bar to="/" InnerText="Home" />
        </li>
        <li>
          {" "}
          <Link_nav_bar to="/users" InnerText="Users" />
        </li>
        <li>
          {" "}
          <Link_nav_bar to="/adduser" InnerText="Add user" />
        </li>
        <li>
          {" "}
          <Link_nav_bar to="/stars" InnerText="Stars" />
        </li>
      </ul>
    </header>
  </>
  )
}

export default Header
