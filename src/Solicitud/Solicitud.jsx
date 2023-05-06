import React, { useState, useEffect } from "react";
import ListaBooks from "../ListaBooks/ListaBooks";
import App from "../App";

const Solicitud = ({ changePage }) => {
    const [libros, setLibros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);


    const fetchSolicitud = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        setLibros(data.results);
        setIsLoading(false);
    };


    useEffect(() => {

        fetchSolicitud("https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=zyQSyLT8VPGwMWm5YrjKlcuAcxCpwCA8");
    }, []);

    const handleClick = (libroTitle) => {
        setLibroSeleccionado(libroTitle);
        changePage('bookPage')

    };
    
    return (
        <div>
            <div className="container-father">
                <div className="container-title">
                    <h1>New York Times</h1>
                    <i className="fa-regular fa-registered"></i>
                </div>
                <div className="bestSeller">
                    <h1 className="bestSeller">Best Sellers</h1>
                </div>
            </div>
            <hr />

            {isLoading ? (
                <div className="loading">
                    <img
                        src="./logo192.png"
                        alt="React Logo"
                        className="rotating-image"
                    />
                </div>
            ) : (
                <section className="section-container">
                    {libros.map((libro) => {
                        return (
                            <div key={libro.list_name_encoded}>
                                <div className="container-libros">
                                    <h2>{libro.list_name}</h2>
                                    <hr />
                                    <p>Oldest: {libro.newest_published_date}</p>
                                    <p>Newest: {libro.oldest_published_date}</p>
                                    <p>Updated: {libro.updated.toLowerCase()}</p>
                                    <button onClick={() => handleClick(libro.list_name_encoded)}>
                                        READ MORE!{" "}
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                </section>
            )}

            {libroSeleccionado && (
                <App libroSeleccionado={libroSeleccionado} />
            )}
        </div>
    );
}; 



export default Solicitud;
