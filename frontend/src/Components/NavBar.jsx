/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: NavBar.jsx
Main Developer: Professor Ziad Ewais (provided the starter code)
Modified By: Shreyas Bhinkah
Description: This component represents the navigation bar of the grocery store application.
             
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/




export default function NavBar({ quantity }) {
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>Hello, @username</h3>
      </div>
      <div className="NavDiv NavTitle">
        <h2><strong>Groceries App 🍎</strong></h2>
      </div>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
        />
      </div>
    </nav>
  );
}
