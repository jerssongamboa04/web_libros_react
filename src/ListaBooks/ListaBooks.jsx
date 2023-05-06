import React from "react";
import { useState, useEffect } from "react";

const ListaBooks = ({ titulo }) => {
    const [libros, setLibros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(titulo);
    useEffect(() => {
        if (titulo) {
            const llamadaLibros = `https://api.nytimes.com/svc/books/v3/lists/current/${titulo}.json?api-key=zyQSyLT8VPGwMWm5YrjKlcuAcxCpwCA8`;
            const fetchLibros = async () => {
                const response = await fetch(llamadaLibros);
                const data = await response.json();
                setLibros(data.results.books);
                setIsLoading(false);

            };
            fetchLibros();
        }
    }, [titulo]);

    return (
        <section>
            {isLoading ? (
                <p></p>
            ) : (
                <>
                    <h1>{titulo}</h1>
                    <hr />
                    <button className="buttonBack" ><i className="fa-solid fa-chevron-left"></i> BACK TO INDEX</button>
                    <section className="section-books">
                        <div className="container-book-list">
                            {libros.map((libro) => (
                                <div className="book-description" key={libro.rank}>
                                    <p className="title-books">#{libro.rank} {libro.title}</p>
                                    <img src={libro.book_image} alt={libro.title} />
                                    <p><i>weeks on list: {libro.weeks_on_list}</i></p>
                                    <p>{libro.description}</p>
                                    <button>
                                        {libro.buy_links.map((link, index) => {
                                            return link.name === 'Amazon' ? <a key={index} target="_blank" href={link.url}>BUY AT AMAZON <i className="fa-regular fa-circle-play"></i></a> : null;
                                        })}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </section>
    );
};

export default ListaBooks;

