import { createContext, useContext, useState } from "react";

const DeleteContext = createContext();

export const DeleteMessageProvider = ({ children }) => {
    const [deletemessage, setDeleteMessage] = useState("");

    return (
        <DeleteContext.Provider value={{ deletemessage, setDeleteMessage }}>
            {children}
        </DeleteContext.Provider>
    );
};

export const useDeleteMessage = () => useContext(DeleteContext);
