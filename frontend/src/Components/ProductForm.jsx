/*
Due Date: 2025-11-21
Course: COMP2013 - Web Programming 2
Project: Project-2 - Grocery App 2.0
Filename: ProductForm.jsx
Main Developer: Shreyas Bhinkah
Description: This component renders a form for adding or editing products in the grocery app.             
Resources: Lecture Recordings, React.dev, MDN, W3Schools
*/


export default function ProductForm({
  isInEditMode,handleOnChange,formData, postResponse,handleOnSubmit  
}) 
{
  //renders the product form
  return (

    <div className="ProductForm">

      <h2>Product Form</h2>

        {/*Form contains 4 text input fields and 1 submit button*/}
      <form onSubmit={handleOnSubmit}>

        <input
          id="productName"
          name="productName"
          type="text"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleOnChange}
        />
        <br />

        <input
          id="brand"
          name="brand"
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleOnChange} />

        <br />

        <input
          id="image"
          name="image"
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleOnChange} />

        <br />

        <input
          id="price"
          name="price"
           type="text"
          placeholder="Price"
          value={formData.price}
          onChange={handleOnChange} />

        <br />

        <button type="submit" id="FormSubmitButton"> {isInEditMode ? "Edit" : "Submit"} </button>

      </form>

      {postResponse && <p>{postResponse}</p>}

    </div>

  );
}
