import { createContext } from "react"; // Importing createContext to create context for our components

const NoteContext = createContext(); // createContext() is used to create context for for our components

export default NoteContext; // Exporting our created context so that any components cas use this in it

// The Context API can be used to share data with multiple components, without having to pass data through props manually. Any state inside a context will become accessible to every component of the React Application. Now, let’s begin working with Context API.