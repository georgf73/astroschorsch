import { createContext, useState, useEffect } from "react";

const ObjectContext = createContext();

export const ObjectProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [objectEdit, setObjectEdit] = useState({
    item: {},
    edit: false,
  });

  const [objects, setObjects] = useState([]);

  useEffect(() => {
    fetchObjects();
  }, []);

  const fetchObjects = async () => {
    const response = await fetch("objects?_sort=id&_order=desc");
    const data = await response.json();
    setObjects(data);
    setIsLoading(false);
  };

  // Add Object
  const addObject = async (newObject) => {
    const response = await fetch("/objects", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    });
    const data = await response.json();

    setObjects([data, ...objects]);
  };

  //Update Object
  const updateObject = async (id, updItem) => {
    const response = await fetch(`/objects/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json();
    
    setObjects(
      objects.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // Set Object to Editmode
  const editObject = (item) => {
    setObjectEdit({
      item,
      edit: true,
    });
  };

  // Delete Object
  const deleteObject = async (objectid) => {
    if (window.confirm("Willst Du wirklich löschen?")) {
      await fetch(`/objects/${objectid}`, {
        method: "DELETE",
      });
      setObjects(objects.filter((object) => object.objectId !== objectid));
    }
  };

  return (
    <ObjectContext.Provider
      value={{
        objects,
        isLoading,
        objectEdit,
        deleteObject,
        addObject,
        editObject,
        updateObject,
      }}
    >
      {children}
    </ObjectContext.Provider>
  );
};

export default ObjectContext;
